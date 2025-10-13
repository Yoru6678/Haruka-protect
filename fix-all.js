const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const scriptName = "fix-all.js"; // ← nom du script à ignorer
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

function fixFile(filePath) {
  if (path.basename(filePath) === scriptName) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Corrige les erreurs de type "channel.await messages.get(...)"
  content = content.replace(/channel\.await\s+messages\.get\(/g, "channel.messages.fetch(");
  content = content.replace(/await\s+channel\.await\s+messages\.get\(/g, "await channel.messages.fetch(");
  content = content.replace(/await\s+channel\.await\s+messages\.fetch\(/g, "await channel.messages.fetch(");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔧 Corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixFile);