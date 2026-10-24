#!/usr/bin/env node
/**
 * Quiet — design system validator
 *
 * Checks:
 *   - tokens.json structure and required roles
 *   - every colour role has light and dark values
 *   - core text contrast is AA in both modes, and published ratios match
 *   - VERSION, package.json and tokens.json versions agree
 *   - generated token files are current
 *   - required entry-point files exist
 *   - local links in Markdown, HTML, llms.txt and the reference CSS resolve
 *
 * No dependencies. Run: npm run check
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import {
  CSS_PATH,
  MD_PATH,
  ROOT,
  TOKENS_PATH,
  loadTokens,
  renderCss,
  renderMarkdown,
} from "./build-tokens.mjs";

const errors = [];
const notes = [];
const fail = (message) => errors.push(message);

function rel(path) {
  return relative(ROOT, path);
}

function read(path) {
  return readFileSync(path, "utf8");
}

/* -------------------------------------------------------------------------- */
/* Tokens                                                                     */
/* -------------------------------------------------------------------------- */

let tokens;
try {
  tokens = loadTokens();
} catch (error) {
  console.error(`Cannot read ${rel(TOKENS_PATH)}: ${error.message}`);
  process.exit(1);
}

const requiredSections = [
  "$meta",
  "color",
  "typography",
  "space",
  "layout",
  "density",
  "radius",
  "border",
  "elevation",
  "motion",
  "opacity",
  "icon",
  "breakpoint",
  "zIndex",
  "dataViz",
  "component",
  "contrast",
];

for (const section of requiredSections) {
  if (!(section in tokens)) fail(`tokens.json is missing the "${section}" section.`);
}

const requiredColors = [
  "canvas",
  "surface",
  "surfaceRaised",
  "surfaceSunken",
  "ink",
  "inkSecondary",
  "inkTertiary",
  "inkInverse",
  "line",
  "lineSoft",
  "lineStrong",
  "accent",
  "accentHover",
  "accentInk",
  "accentWash",
  "accentLine",
  "focus",
  "selection",
  "positive",
  "positiveWash",
  "negative",
  "negativeWash",
  "warning",
  "warningWash",
  "primaryAction",
  "primaryActionInk",
  "primaryActionHover",
  "hover",
  "selected",
  "scrim",
  "overlaySurface",
  "skeleton",
  "disabledSurface",
  "disabledInk",
];

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i;

function isColor(value) {
  return typeof value === "string" && (HEX.test(value) || RGB.test(value) || value === "transparent");
}

let colorCount = 0;
for (const key of requiredColors) {
  const role = tokens.color?.[key];
  if (!role) {
    fail(`Missing required colour role: color.${key}`);
    continue;
  }
  if (!role.role) fail(`color.${key} needs a "role" description.`);
  for (const mode of ["light", "dark"]) {
    if (!role[mode]) fail(`color.${key} needs a "${mode}" value.`);
    else if (!isColor(role[mode])) fail(`color.${key}.${mode} is not a valid colour: ${role[mode]}`);
  }
  colorCount += 1;
}

if (tokens.color?.appTint) {
  for (const [key, value] of Object.entries(tokens.color.appTint)) {
    if (key.startsWith("$")) continue;
    for (const mode of ["light", "dark"]) {
      if (!value[mode]) fail(`color.appTint.${key} needs a "${mode}" value.`);
      else if (!isColor(value[mode])) fail(`color.appTint.${key}.${mode} is not a valid colour.`);
    }
  }
}


const requiredTypeSteps = [
  "display-1",
  "display-2",
  "title-1",
  "title-2",
  "heading",
  "body",
  "body-sm",
  "label",
  "micro",
  "numeric-xl",
  "numeric-l",
  "numeric-m",
];
for (const step of requiredTypeSteps) {
  const value = tokens.typography?.scale?.[step];
  if (!value) {
    fail(`Missing type step: typography.scale.${step}`);
    continue;
  }
  if (!value.px || !value.lineHeight || !value.tracking || !value.weight) {
    fail(`Type step ${step} needs px, lineHeight, tracking and weight.`);
  }
}

const requiredLayout = ["railWidth", "navWidth", "topbarHeight", "contentMax", "contentPadX", "gap"];
for (const key of requiredLayout) {
  if (!tokens.layout?.[key]) fail(`Missing layout token: layout.${key}`);
}

for (const key of ["1", "2", "3", "4", "5", "6"]) {
  if (!tokens.dataViz?.series?.[key]) fail(`Missing data visualisation series: dataViz.series.${key}`);
}
for (const key of ["grid", "axis", "area"]) {
  if (!tokens.dataViz?.[key]) fail(`Missing data visualisation token: dataViz.${key}`);
}
for (const key of ["fast", "base", "slow"]) {
  if (!tokens.motion?.duration?.[key]) fail(`Missing motion duration: motion.duration.${key}`);
}
for (const key of ["standard", "enter", "exit"]) {
  if (!tokens.motion?.easing?.[key]) fail(`Missing motion easing: motion.easing.${key}`);
}

/* -------------------------------------------------------------------------- */
/* Versions                                                                   */
/* -------------------------------------------------------------------------- */

let version = "";
let packageVersion = "";
let packageDoc = null;
try {
  version = read(resolve(ROOT, "VERSION")).trim();
} catch {
  fail("VERSION is missing.");
}
try {
  packageDoc = JSON.parse(read(resolve(ROOT, "package.json")));
  packageVersion = packageDoc.version;
} catch {
  fail("package.json is missing or invalid.");
}
if (packageDoc && packageDoc.license !== "MIT") {
  fail(`package.json license is "${packageDoc.license}"; expected "MIT".`);
}
if (packageDoc && packageDoc.name !== "quiet-design-system") {
  fail(`package.json name is "${packageDoc.name}"; expected "quiet-design-system".`);
}

const tokenVersion = tokens.$meta?.version;
if (!version) fail("VERSION is empty.");
if (version !== tokenVersion) fail(`VERSION (${version}) does not match tokens.json $meta.version (${tokenVersion}).`);
if (packageVersion !== version) fail(`package.json (${packageVersion}) does not match VERSION (${version}).`);
if (!tokens.$meta?.captured) fail("tokens.json needs $meta.captured.");
for (const path of tokens.$meta?.readingOrder ?? []) {
  if (!existsSync(resolve(ROOT, path))) fail(`tokens.json readingOrder points to a missing file: ${path}`);
}

/* -------------------------------------------------------------------------- */
/* Contrast                                                                   */
/* -------------------------------------------------------------------------- */

function parseHex(value) {
  if (!HEX.test(value)) throw new Error(`Not a hex colour: ${value}`);
  let hex = value.slice(1);
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length === 8) hex = hex.slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const contrastPairs = [
  ["ink / canvas", "ink", "canvas"],
  ["inkSecondary / canvas", "inkSecondary", "canvas"],
  ["inkTertiary / canvas", "inkTertiary", "canvas"],
  ["inkTertiary / surface", "inkTertiary", "surface"],
  ["accent / surface", "accent", "surface"],
  ["primaryActionInk / primaryAction", "primaryActionInk", "primaryAction"],
  ["positive / surface", "positive", "surface"],
  ["negative / surface", "negative", "surface"],
  ["warning / surface", "warning", "surface"],
];

const published = new Map((tokens.contrast?.pairs ?? []).map((pair) => [pair.pair, pair]));

for (const [label, fgKey, bgKey] of contrastPairs) {
  const fg = tokens.color?.[fgKey];
  const bg = tokens.color?.[bgKey];
  if (!fg || !bg) continue;
  const entry = published.get(label);
  if (!entry) fail(`contrast.pairs is missing "${label}".`);

  for (const mode of ["light", "dark"]) {
    const ratio = contrast(fg[mode], bg[mode]);
    if (!entry) continue;
    if (Math.abs(ratio - entry[mode]) > 0.02) {
      fail(`contrast.pairs "${label}" ${mode} is ${entry[mode]}; computed ${ratio.toFixed(2)}.`);
    }
    if (ratio < 4.5) {
      fail(`Contrast ${label} (${mode}) is ${ratio.toFixed(2)}:1, below AA 4.5:1.`);
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Generated artifacts                                                        */
/* -------------------------------------------------------------------------- */

for (const [path, expected, label] of [
  [CSS_PATH, renderCss(tokens), "quiet.tokens.css"],
  [MD_PATH, renderMarkdown(tokens), "token-reference.md"],
]) {
  if (!existsSync(path)) {
    fail(`${label} is missing. Run npm run build:tokens.`);
    continue;
  }
  if (read(path) !== expected) {
    fail(`${label} is stale. Run npm run build:tokens and commit the result.`);
  }
}

/* -------------------------------------------------------------------------- */
/* Required files                                                             */
/* -------------------------------------------------------------------------- */

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "llms.txt",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "LICENSE",
  "VERSION",
  "package.json",
  "design-system/README.md",
  "design-system/docs/design-language.md",
  "design-system/docs/ux-architecture.md",
  "design-system/docs/components.md",
  "design-system/docs/dark-mode.md",
  "design-system/docs/iconography.md",
  "design-system/assets/icons.svg",
  "design-system/tokens/tokens.json",
  "design-system/tokens/quiet.tokens.css",
  "design-system/tokens/token-reference.md",
  "design-system/tokens/README.md",
  "design-system/agent/README.md",
  "design-system/agent/brief.md",
  "design-system/agent/delivery-contract.md",
  "design-system/agent/review-checklist.md",
  "design-system/decisions/README.md",
  "design-system/decisions/0001-adopt-quiet.md",
  "design-system/decisions/0002-one-family-accent.md",
  "design-system/decisions/0003-designed-night-mode.md",
  "design-system/decisions/0004-system-typeface.md",
  "design-system/decisions/0005-tokens-are-the-source-of-truth.md",
  "design-system/decisions/0006-repository-is-the-contract.md",
  "design-system/agent/examples/ledger-overview.md",
  "design-system/agent/examples/conversation.md",
  "design-system/reference/index.html",
  "design-system/reference/reference.css",
  "design-system/reference/reference.js",
  "design-system/reference/screens/reference-screen-light.png",
  "design-system/reference/screens/reference-screen-dark.png",
  "design-system/reference/screens/quiet-night.png",
  "design-system/reference/screens/quiet-accent.png",
  "design-system/reference/screens/quiet-dark.png",
  "archive/exploration/README.md",
  "archive/exploration/index.html",
  "archive/exploration/compare.html",
  "archive/exploration/STYLE-OPTIONS.md",
  "scripts/build-tokens.mjs",
  "scripts/validate.mjs",
  ".github/workflows/validate.yml",
  ".github/copilot-instructions.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/system-gap.md",
];

for (const file of requiredFiles) {
  if (!existsSync(resolve(ROOT, file))) fail(`Missing required file: ${file}`);
}

const licensePath = resolve(ROOT, "LICENSE");
if (!existsSync(licensePath)) {
  fail("LICENSE is missing.");
} else {
  const license = read(licensePath);
  if (!license.startsWith("MIT License")) fail("LICENSE is not an MIT license.");
  if (!/Copyright \(c\) 2026 Graeme Lockley/.test(license)) {
    fail("LICENSE needs a 2026 Graeme Lockley copyright line.");
  }
}

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
/* -------------------------------------------------------------------------- */

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, "").replace(/<code>[\s\S]*?<\/code>/g, "");
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

const linkTargets = [];
const markdownFiles = walk(ROOT).filter((file) => [".md", ".txt"].includes(extname(file)));
const htmlFiles = walk(ROOT).filter((file) => extname(file) === ".html");

for (const file of markdownFiles) {
  let text = stripCode(read(file));
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    linkTargets.push([file, match[1]]);
  }
}

for (const file of htmlFiles) {
  const text = read(file);
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    linkTargets.push([file, match[1]]);
  }
}

for (const file of walk(ROOT).filter((f) => extname(f) === ".css")) {
  const text = read(file);
  for (const match of text.matchAll(/@import\s+(?:url\()?["']?([^"')\s]+)["']?\)?/g)) {
    linkTargets.push([file, match[1]]);
  }
}

let linkCount = 0;
for (const [file, rawTarget] of linkTargets) {
  const target = rawTarget.replace(/^<|>$/g, "");
  if (
    !target ||
    target.startsWith("#") ||
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("tel:") ||
    target.startsWith("data:") ||
    target.startsWith("javascript:") ||
    target.startsWith("{")
  ) {
    continue;
  }

  const pathPart = decodeURIComponent(target.split("#")[0].split("?")[0]);
  if (!pathPart) continue;
  const resolved = resolve(dirname(file), pathPart);
  linkCount += 1;
  if (!existsSync(resolved)) {
    fail(`Broken link in ${rel(file)}: ${target}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                    */
/* -------------------------------------------------------------------------- */

notes.push(`${colorCount} required colour roles, both modes`);
notes.push(`${contrastPairs.length} contrast pairs verified at AA in light and dark`);
notes.push(`versions agree on ${version}`);
notes.push(`generated CSS and token reference are current`);
notes.push(`${linkCount} local links checked`);

if (errors.length) {
  console.error(`\nQuiet ${version || "?"} — validation failed\n`);
  for (const error of errors) console.error(`  ✗ ${error}`);
  console.error(`\n${errors.length} problem${errors.length === 1 ? "" : "s"} found.\n`);
  process.exit(1);
}

console.log(`\nQuiet ${version} — design system valid\n`);
for (const note of notes) console.log(`  ✓ ${note}`);
console.log("");
