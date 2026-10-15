import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Design-system coverage guard (God Mode audit, Phase 2: "Fail CI if a page
 * uses an unrecognized design-system class").
 *
 * Every className token referenced by a component must have a matching
 * selector somewhere in the project CSS. The 2026-10 rebuild left a handful of
 * pages rendering raw browser controls because tokens like `m-jax-*` had no
 * selectors — this test keeps that class of regression out of `main`.
 */

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", ".21st", ".cursor", ".github", ".vscode",
  "public", "supabase", "docs", "__tests__"
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

/** Class selectors: strip comments and declaration bodies; selectors remain. */
function collectCssClasses(cssFiles: string[]): Set<string> {
  const classes = new Set<string>();
  for (const file of cssFiles) {
    let text = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    let prev: string | null = null;
    while (prev !== text) {
      prev = text;
      text = text.replace(/\{[^{}]*\}/g, "");
    }
    let c: RegExpExecArray | null;
    const re = /\.([A-Za-z_][\w-]*)/g;
    while ((c = re.exec(text)) !== null) classes.add(c[1]);
  }
  return classes;
}

const validToken = (t: string) => /^[A-Za-z_][\w-]*$/.test(t) && t.length > 1;

function collectUsedTokens(tsFiles: string[]): Map<string, string[]> {
  const used = new Map<string, string[]>();
  const add = (tok: string, file: string) => {
    if (!used.has(tok)) used.set(tok, []);
    if (!used.get(tok)!.includes(file)) used.get(tok)!.push(file);
  };

  for (const file of tsFiles) {
    const src = fs.readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file);

    // 1) Plain string: className="a b" / className={"a b"}
    let m: RegExpExecArray | null;
    const plain = /className\s*=\s*\{?\s*["']([^"']+)["']/g;
    while ((m = plain.exec(src)) !== null) {
      for (const tok of m[1].split(/\s+/)) if (validToken(tok)) add(tok, rel);
    }

    // 2) Braced non-template: className={cond ? "a b" : "c"} or className={fn("a")}
    const braced = /className\s*=\s*\{([^`{}]*)\}/g;
    while ((m = braced.exec(src)) !== null) {
      const inner = m[1];
      if (inner.includes("${") || inner.includes("`")) continue;
      const lit = /["']([A-Za-z_][^"']*)["']/g;
      let q: RegExpExecArray | null;
      while ((q = lit.exec(inner)) !== null) {
        for (const tok of q[1].split(/\s+/)) if (validToken(tok)) add(tok, rel);
      }
    }

    // 3) Template literal: className={`base ${cond ? "opt" : ""}`}
    const tpl = /className\s*=\s*\{`([^`]*)`\}/g;
    while ((m = tpl.exec(src)) !== null) {
      const content = m[1];
      // Static parts: drop the expressions entirely.
      const staticPart = content.replace(/\$\{[^}]*\}/g, " ");
      for (const tok of staticPart.split(/\s+/)) if (validToken(tok)) add(tok, rel);
      // Conditional branch literals after the ternary "?" are class names;
      // literals before it (comparisons like === "all") are not.
      const expr = /\$\{([^}]*)\}/g;
      let e: RegExpExecArray | null;
      while ((e = expr.exec(content)) !== null) {
        const qIdx = e[1].indexOf("?");
        if (qIdx === -1) continue;
        const branches = e[1].slice(qIdx + 1);
        const lit = /["']([A-Za-z_][^"']*)["']/g;
        let q: RegExpExecArray | null;
        while ((q = lit.exec(branches)) !== null) {
          for (const tok of q[1].split(/\s+/)) if (validToken(tok)) add(tok, rel);
        }
      }
    }
  }
  return used;
}

describe("design-system class coverage", () => {
  it("every className token referenced by a component has a CSS selector", () => {
    const files = walk(ROOT);
    const cssFiles = files.filter((f) => f.endsWith(".css"));
    const tsFiles = files.filter((f) => /\.(tsx|ts)$/.test(f));

    const cssClasses = collectCssClasses(cssFiles);
    const used = collectUsedTokens(tsFiles);

    expect(cssClasses.size).toBeGreaterThan(500); // sanity: CSS was actually parsed

    // A token ending in "-" is a dynamic family prefix (e.g. `ui-tag--` from
    // `ui-tag--${tone}`): it is covered when any selector starts with it.
    const covered = (token: string): boolean => {
      if (cssClasses.has(token)) return true;
      if (token.endsWith("-")) {
        for (const c of cssClasses) if (c.startsWith(token)) return true;
      }
      return false;
    };

    const missing: { token: string; files: string[] }[] = [];
    for (const [token, files2] of used) {
      if (!covered(token)) missing.push({ token, files: files2 });
    }

    expect(
      missing.map(({ token, files: f }) => `${token} <- ${f.join(", ")}`).join("\n"),
      `classNames with no CSS selector (add the selector or stop using the token):\n${missing
        .map(({ token }) => token)
        .join(", ")}\n`
    ).toBe("");
  });
});
