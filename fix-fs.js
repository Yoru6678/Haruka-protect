const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js", ".ts", ".jsx", ".cjs", ".mjs"];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (extensions.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Corriger .fetch(...) → await .get(...)
  const fetchRegex = /(\b\w+)\.fetch\(([^)]+)\)/g;
  if (fetchRegex.test(content)) {
    content = content.replace(fetchRegex, "await $1.get($2)");
    modified = true;
  }

  // Ajouter async aux fonctions si nécessaire
  const usesAwait = content.includes("await ");
  const hasAsyncFunction = /async\s+function/.test(content) || /async\s+\(/.test(content);
  if (usesAwait && !hasAsyncFunction) {
    content = content.replace(/function\s+(\w+)\s*\(/, "async function $1(");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔧 Corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixFile);