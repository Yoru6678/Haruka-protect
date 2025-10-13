const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js", ".ts", ".jsx", ".cjs", ".mjs"];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file === "node_modules") continue;
      walk(fullPath, files);
    } else if (extensions.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixExecuteAsync(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Corrige execute: function(...) → execute: async function(...)
  content = content.replace(
    /execute\s*:\s*(?!async\s*)function\s*\(/g,
    "execute: async function("
  );

  // Corrige execute(...) { → async execute(...) {
  content = content.replace(
    /(?<!async\s)execute\s*\(([^)]*)\)\s*{/g,
    "async execute($1) {"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ execute rendu async : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixExecuteAsync);