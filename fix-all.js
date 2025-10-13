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

function fixAsyncDuplication(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Supprime les doublons async async
  content = content.replace(/\basync\s+async\b/g, "async");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ doublon async corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixAsyncDuplication);