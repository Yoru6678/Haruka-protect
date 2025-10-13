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

function fixAsync(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  const usesAwait = content.includes("await ");
  const hasAsyncFunction =
    /async\s+function/.test(content) ||
    /execute\s*:\s*async\s*function/.test(content) ||
    /async\s*\(/.test(content);

  if (usesAwait && !hasAsyncFunction) {
    // Fonctions classiques
    content = content.replace(/function\s+(\w+)\s*\(/, "async function $1(");

    // Méthodes Discord type execute: function(...)
    content = content.replace(/execute\s*:\s*function\s*\(/, "execute: async function(");

    // Fonctions fléchées anonymes
    content = content.replace(/const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/, "const $1 = async ($2) => {");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ async ajouté : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixAsync);