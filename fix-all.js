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

function fixTopLevelAwait(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Si le fichier contient await mais aucune fonction
  if (content.includes("await ") && !/function\s|\(\)\s*=>/.test(content)) {
    content = `(async () => {\n${content}\n})();`;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ encapsulé dans async IIFE : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixTopLevelAwait);