const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const scriptName = "fix-all.js"; // ← nom du fichier à ignorer
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
  if (path.basename(filePath) === scriptName) return; // ← protection

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // 1. Remplacer .fetch(...) par await .get(...)
  content = content.replace(/(\b\w+)\.fetch\(([^)]+)\)/g, "await $1.get($2)");

  // 2. Corriger client.await users.get(...) → client.users.fetch(...)
  content = content.replace(/client\.await\s+users\.get\(/g, "client.users.fetch(");
  content = content.replace(/client\.await\s+users\.fetch\(/g, "client.users.fetch(");
  content = content.replace(/await\s+client\.await\s+users\.fetch\(/g, "await client.users.fetch(");
  content = content.replace(/await\s+client\.await\s+users\.get\(/g, "await client.users.fetch(");

  // 3. Ajouter async aux fonctions si nécessaire
  const usesAwait = content.includes("await ");
  const hasAsyncFunction = /async\s+function/.test(content) || /async\s+\(/.test(content);
  if (usesAwait && !hasAsyncFunction) {
    content = content.replace(/function\s+(\w+)\s*\(/, "async function $1(");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔧 Corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixFile);