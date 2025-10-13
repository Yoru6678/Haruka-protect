const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js"];

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

function fixExtraClosingParenthesis(filePath) {
  if (filePath === __filename) return;
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Corrige ...get(...)) → ...get(...);
  content = content.replace(/\.get\(([^)]+)\)\)/g, (_, inner) => `.get(${inner})`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ parenthèse en trop supprimée : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixExtraClosingParenthesis);