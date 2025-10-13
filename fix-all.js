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

function fixAwaitInsideGet(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Corrige client.channels.cache.get(await rlog.get(...))
  content = content.replace(
    /client\.channels\.cache\.get\(\s*await\s+(rlog\.get\([^)]+\))\s*\)/g,
    (match, inner) => {
      return `const raidlogId = await ${inner};\nconst channel = client.channels.cache.get(raidlogId);`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ await dans .get corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixAwaitInsideGet);