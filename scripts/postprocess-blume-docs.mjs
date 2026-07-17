import { access, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const distDir = path.join(repositoryRoot, "apps/docs/dist");
const githubBlobBaseUrl = "https://github.com/nevitonsantana/AletheIA/blob/main/";
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

function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function removeDuplicateGeneratedHeading(html) {
  return html.replace(
    /(<article\b[^>]*>)\s*(<h1(?![^>]*\bid=)[^>]*>([\s\S]*?)<\/h1>)\s*(<h1\b[^>]*\bid=["'][^"']+["'][^>]*>([\s\S]*?)<\/h1>)/,
    (match, articleOpen, generatedHeading, generatedText, markdownHeading, markdownText) => {
      if (stripTags(generatedText) !== stripTags(markdownText)) {
        return match;
      }

      return `${articleOpen}${markdownHeading}`;
    },
  );
}

function rewriteMarkdownHref(href, isRootIndexPage) {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const match = href.match(/^(?<target>[^?#]*?)\.(?:md|mdx)(?<suffix>[?#].*)?$/i);
  if (!match?.groups) {
    return href;
  }

  const { target, suffix = "" } = match.groups;

  const prefix = isRootIndexPage ? "" : "../";

  if (target === "index") {
    return `${prefix}${suffix}`;
  }

  return `${prefix}${target}/${suffix}`;
}

function rewriteMarkdownLinks(html, file) {
  const isRootIndexPage = path.relative(distDir, file) === "index.html";

  return html.replace(/\bhref=(['"])([^'"]+?)\1/g, (full, quote, href) => {
    const rewritten = rewriteMarkdownHref(href, isRootIndexPage);
    return `href=${quote}${rewritten}${quote}`;
  });
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

function sourcePathForHtmlFile(file) {
  const relativeFile = path.relative(distDir, file);

  if (relativeFile === "index.html") {
    return path.join(repositoryRoot, "docs/index.mdx");
  }

  if (!relativeFile.endsWith("/index.html")) {
    return null;
  }

  return path.join(repositoryRoot, "docs", relativeFile.slice(0, -"/index.html".length) + ".md");
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function rewriteRepositorySourceLinks(html, file) {
  const sourcePath = sourcePathForHtmlFile(file);
  if (!sourcePath) {
    return html;
  }

  const replacements = new Map();

  for (const match of html.matchAll(/\bhref=(['"])([^'"]+)\1/g)) {
    const href = match[2];
    if (isExternalHref(href)) {
      continue;
    }

    const cleanHref = href.split("#")[0].split("?")[0];
    if (!cleanHref || cleanHref.startsWith("/")) {
      continue;
    }

    const repositoryTarget = path.resolve(path.dirname(sourcePath), cleanHref);
    if (!repositoryTarget.startsWith(repositoryRoot + path.sep)) {
      continue;
    }

    const repositoryRelativeTarget = path.relative(repositoryRoot, repositoryTarget);
    if (repositoryRelativeTarget.startsWith(`docs${path.sep}`)) {
      continue;
    }

    if (await fileExists(repositoryTarget)) {
      const suffix = href.slice(cleanHref.length);
      replacements.set(href, `${githubBlobBaseUrl}${repositoryRelativeTarget}${suffix}`);
    }
  }

  if (replacements.size === 0) {
    return html;
  }

  return html.replace(/\bhref=(['"])([^'"]+)\1/g, (full, quote, href) => {
    return replacements.has(href) ? `href=${quote}${replacements.get(href)}${quote}` : full;
  });
}

const files = await walk(distDir);
let updatedHtml = 0;
let removedRawMarkdown = 0;

for (const file of files) {
  if (file.endsWith(".html")) {
    const original = await readFile(file, "utf8");
    const next = await rewriteRepositorySourceLinks(rewriteMarkdownLinks(removeDuplicateGeneratedHeading(original), file), file);
    if (next !== original) {
      await writeFile(file, next);
      updatedHtml += 1;
    }
  }
}

for (const file of files) {
  if (markdownExtensionPattern.test(file)) {
    await rm(file);
    removedRawMarkdown += 1;
  }
}

console.log(`Postprocessed Blume docs: updated ${updatedHtml} HTML file(s), removed ${removedRawMarkdown} raw Markdown artifact(s).`);
