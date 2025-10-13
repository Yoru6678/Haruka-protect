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

function fixDuplicateRaidlogChannel(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  const lines = content.split("\n");
  let seen = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("const raidlogChannel")) {
      seen++;
      if (seen > 1) {
        lines[i] = lines[i].replace(/const\s+raidlogChannel/, `const raidlogChannel${seen}`);
        // remplace aussi les usages sur la même ligne
        lines[i] = lines[i].replace(/\braidlogChannel\b/g, `raidlogChannel${seen}`);
      }
    } else if (seen > 1 && lines[i].includes("raidlogChannel")) {
      lines[i] = lines[i].replace(/\braidlogChannel\b/g, `raidlogChannel${seen}`);
    }
  }

  content = lines.join("\n");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ redéclaration raidlogChannel renommée : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixDuplicateRaidlogChannel);