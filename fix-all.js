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

function fixDoubleAwait(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Supprime await await
  content = content.replace(/\bawait\s+await\b/g, "await");

  // Supprime await .await ou await awaitX
  content = content.replace(/\bawait\s+(\.\s*)?await(\w*)/g, "await $2");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ doublon await corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixDoubleAwait);