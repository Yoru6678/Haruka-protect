const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js"];

const bug = `} else if (message.member.roles.cache.has(pgs.get(\`permgs_\${message.guild.id}\`) === true) {`;
const fix = `} else if (pgs.get(\`permgs_\${message.guild.id}\`) === true && message.member.roles.cache.has(pgs.get(\`permgs_\${message.guild.id}\`))) {`;

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

function fixBug(filePath) {
  if (filePath === __filename) return;
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(bug)) {
    content = content.replace(bug, fix);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ corrigé dans : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixBug);