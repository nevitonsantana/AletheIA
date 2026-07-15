import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const distDir = path.join(repositoryRoot, "apps/docs/dist");
const markdownExtensionPattern = /\.(md|mdx)$/i;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function textFromHtml(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function isExternalHref(href) {
  return (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("data:") ||
    href.startsWith("javascript:")
  );
}

function resolveInternalHref(htmlFile, href) {
  const cleanHref = href.split("#")[0].split("?")[0];

  if (!cleanHref) {
    return null;
  }

  const normalizedHref = cleanHref === "/AletheIA" || cleanHref === "/AletheIA/"
    ? ""
    : cleanHref.startsWith("/AletheIA/")
      ? cleanHref.slice("/AletheIA/".length)
      : cleanHref.startsWith("/")
        ? cleanHref.slice(1)
        : path.relative(distDir, path.resolve(path.dirname(htmlFile), cleanHref));

  const candidate = path.join(distDir, normalizedHref);

  return [candidate, path.join(candidate, "index.html")];
}

const files = await walk(distDir);
const rawMarkdownArtifacts = files.filter((file) => markdownExtensionPattern.test(file));
const internalMarkdownLinks = [];
const brokenInternalLinks = [];
const duplicateHeadings = [];

for (const file of files.filter((candidate) => candidate.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const relativeFile = path.relative(distDir, file);

  for (const match of html.matchAll(/\bhref=(['"])([^'"]+?\.(?:md|mdx)(?:[?#][^'"]*)?)\1/gi)) {
    const href = match[2];
    if (!href.startsWith("http://") && !href.startsWith("https://")) {
      internalMarkdownLinks.push(`${relativeFile} -> ${href}`);
    }
  }

  for (const match of html.matchAll(/\bhref=(['"])([^'"]+)\1/gi)) {
    const href = match[2];
    if (isExternalHref(href)) {
      continue;
    }

    const targets = resolveInternalHref(file, href);
    if (targets && !targets.some((target) => files.includes(target))) {
      brokenInternalLinks.push(`${relativeFile} -> ${href}`);
    }
  }

  const h1Texts = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => textFromHtml(match[1]));
  if (h1Texts.length >= 2 && h1Texts[0] === h1Texts[1]) {
    duplicateHeadings.push(`${relativeFile} -> ${h1Texts[0]}`);
  }
}

if (rawMarkdownArtifacts.length > 0 || internalMarkdownLinks.length > 0 || brokenInternalLinks.length > 0 || duplicateHeadings.length > 0) {
  console.error("Blume docs output audit failed.");

  if (rawMarkdownArtifacts.length > 0) {
    console.error(`\nRaw Markdown artifacts: ${rawMarkdownArtifacts.length}`);
    console.error(rawMarkdownArtifacts.slice(0, 20).map((file) => path.relative(distDir, file)).join("\n"));
  }

  if (internalMarkdownLinks.length > 0) {
    console.error(`\nInternal links to Markdown artifacts: ${internalMarkdownLinks.length}`);
    console.error(internalMarkdownLinks.slice(0, 20).join("\n"));
  }

  if (brokenInternalLinks.length > 0) {
    console.error(`\nBroken internal links: ${brokenInternalLinks.length}`);
    console.error(brokenInternalLinks.slice(0, 20).join("\n"));
  }

  if (duplicateHeadings.length > 0) {
    console.error(`\nDuplicate first headings: ${duplicateHeadings.length}`);
    console.error(duplicateHeadings.slice(0, 20).join("\n"));
  }

  process.exit(1);
}

console.log("Blume docs output audit passed: no raw Markdown artifacts, internal Markdown links, broken internal links or duplicate first headings.");
