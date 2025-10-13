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

function fixAwaitWithoutAsync(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Vérifie si le fichier contient await
  if (!content.includes("await ")) return;

  // Corrige les fonctions classiques
  content = content.replace(/function\s+(\w+)\s*\(/g, "async function $1(");

  // Corrige les méthodes Discord type execute: function(...)
  content = content.replace(/execute\s*:\s*function\s*\(/g, "execute: async function(");

  // Corrige les fonctions fléchées anonymes
  content = content.replace(/const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/, "const $1 = async ($2) => {");

  // Corrige les exports directs
  content = content.replace(/module\.exports\s*=\s*function\s*\(/g, "module.exports = async function(");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ async ajouté : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixAwaitWithoutAsync);