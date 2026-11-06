#!/usr/bin/env node
// Pre-renders the Mermaid diagrams of a plan page into inline SVG, so the page
// reads completely without scripts or network access (for example, attached
// to a GitHub issue).
//
//   node scripts/render-diagrams.mjs <page.html> [--out <file.html>]
//
// It opens the page in a headless Chromium-based browser (Chrome, Edge,
// Chromium, Brave, Helium; set CHROME_PATH to choose one), lets the page's own
// Mermaid script render with the page's fonts and tokens, and writes each SVG
// in place of its <pre class="mermaid"> block. Needs Node 22+ and network
// access to the Mermaid CDN while rendering. Exits non-zero, leaving the page
// untouched, when a diagram fails to parse or no browser is found.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir, homedir } from "node:os";
import { delimiter, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const BLOCK = /<pre class="mermaid"[^>]*>[\s\S]*?<\/pre>/g;
const TIMEOUT_MS = 90_000;

function usage(message) {
  if (message) console.error(`render-diagrams: ${message}`);
  console.error("usage: node render-diagrams.mjs <page.html> [--out <file.html>]");
  process.exit(2);
}

function parseArgs(argv) {
  const args = { input: null, output: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") args.output = argv[++i] ?? usage("--out needs a path");
    else if (argv[i] === "-h" || argv[i] === "--help") usage();
    else if (!args.input) args.input = argv[i];
    else usage(`unexpected argument: ${argv[i]}`);
  }
  if (!args.input) usage();
  args.input = resolve(args.input);
  args.output = resolve(args.output ?? args.input);
  return args;
}

function findBrowser() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const apps = ["Google Chrome", "Chromium", "Microsoft Edge", "Brave Browser", "Helium"];
  const mac = apps.flatMap((name) => ["/Applications", join(homedir(), "Applications")].map((dir) => join(dir, `${name}.app`, "Contents", "MacOS", name)));
  const win = [process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"], process.env.LOCALAPPDATA]
    .filter(Boolean)
    .flatMap((dir) => [join(dir, "Google", "Chrome", "Application", "chrome.exe"), join(dir, "Microsoft", "Edge", "Application", "msedge.exe"), join(dir, "Chromium", "Application", "chrome.exe")]);
  const names = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge", "brave-browser"];
  const onPath = (process.env.PATH ?? "").split(delimiter).flatMap((dir) => names.map((name) => join(dir, name)));
  return [...mac, ...win, ...onPath].find((candidate) => existsSync(candidate)) ?? null;
}

async function launch(executable, profile) {
  const child = spawn(executable, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--allow-file-access-from-files",
    `--user-data-dir=${profile}`,
    "--remote-debugging-port=0",
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  const endpoint = await new Promise((done, fail) => {
    let log = "";
    const timer = setTimeout(() => fail(new Error(`browser did not start:\n${log}`)), 30_000);
    child.stderr.on("data", (chunk) => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) { clearTimeout(timer); done(match[1]); }
    });
    child.on("exit", (code) => { clearTimeout(timer); fail(new Error(`browser exited with code ${code}:\n${log}`)); });
  });
  return { child, endpoint };
}

function connect(endpoint) {
  const socket = new WebSocket(endpoint);
  const pending = new Map();
  let next = 0;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.fail(new Error(message.error.message));
    else waiter.done(message.result);
  });
  const send = (method, params = {}, sessionId) => new Promise((done, fail) => {
    const id = ++next;
    pending.set(id, { done, fail });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  return new Promise((done, fail) => {
    socket.addEventListener("open", () => done({ send, close: () => socket.close() }), { once: true });
    socket.addEventListener("error", () => fail(new Error("could not connect to the browser")), { once: true });
  });
}

async function render(executable, url) {
  const profile = await mkdtemp(join(tmpdir(), "render-diagrams-"));
  const { child, endpoint } = await launch(executable, profile);
  try {
    const cdp = await connect(endpoint);
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const evaluate = async (expression) => {
      const { result, exceptionDetails } = await cdp.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
      if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
      return result.value;
    };
    await cdp.send("Page.navigate", { url }, sessionId);
    const deadline = Date.now() + TIMEOUT_MS;
    let state = "";
    while (!state) {
      if (Date.now() > deadline) throw new Error("timed out waiting for Mermaid; check network access to cdn.jsdelivr.net");
      await new Promise((done) => setTimeout(done, 200));
      state = await evaluate(`location.href === ${JSON.stringify(url)} ? (window.__diagrams || "") : ""`).catch(() => "");
    }
    if (state !== "done") throw new Error(`Mermaid failed: ${state.replace(/^error: /, "")}`);
    const svgs = await evaluate(`[...document.querySelectorAll(".mermaid")].map((el) => el.innerHTML.trim())`);
    await cdp.send("Browser.close").catch(() => {});
    cdp.close();
    return svgs;
  } finally {
    child.kill();
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

const { input, output } = parseArgs(process.argv.slice(2));
const html = await readFile(input, "utf8");
const blocks = html.match(BLOCK) ?? [];
if (!blocks.length) {
  console.log("render-diagrams: no Mermaid blocks to render");
  process.exit(0);
}
const executable = findBrowser();
if (!executable) {
  console.error("render-diagrams: no Chromium-based browser found. Install Chrome, Edge, or Chromium, or set CHROME_PATH.");
  process.exit(1);
}

let svgs;
try {
  svgs = await render(executable, pathToFileURL(input).href);
} catch (error) {
  console.error(`render-diagrams: ${error.message}`);
  process.exit(1);
}
if (svgs.length !== blocks.length) {
  console.error(`render-diagrams: found ${blocks.length} Mermaid blocks but rendered ${svgs.length}; keep each one as <pre class="mermaid">.`);
  process.exit(1);
}
const broken = svgs.map((svg, i) => (/<svg[\s>]/.test(svg) && !/Syntax error in text/.test(svg) ? null : i + 1)).filter(Boolean);
if (broken.length) {
  console.error(`render-diagrams: diagram ${broken.join(", ")} did not render; fix its Mermaid source.`);
  process.exit(1);
}

const WIDE = 960;
svgs.forEach((svg, n) => {
  const width = Number(svg.match(/<svg[^>]*\swidth="([\d.]+)"/)?.[1]);
  if (width > WIDE) console.warn(`render-diagrams: warning: diagram ${n + 1} is ${Math.round(width)}px wide (limit ${WIDE}px) and will scroll on narrow screens. Shorten its labels, use flowchart TB, or split it.`);
});

let i = 0;
const baked = html.replace(BLOCK, () => `<div class="mermaid" data-processed="true">${svgs[i++]}</div>`);
await writeFile(output, baked);
console.log(`render-diagrams: rendered ${svgs.length} diagrams into ${output}`);
