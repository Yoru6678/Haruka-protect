const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js"];

const bug = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)";
const fix = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))";

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

function fixLogChannel(filePath) {
  if (filePath === __filename) return;
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(bug)) {
    content = content.replace(bug, fix);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ parenthèse manquante corrigée dans : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixLogChannel);