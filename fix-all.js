const fs = require("fs");
const path = require("path");

const target = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);";
const broken = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);";
const bugged = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);";
const wrong = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);";
const fix = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));";

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

function brutalReplace(filePath) {
  if (filePath === __filename) return;
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(wrong)) {
    content = content.replace(wrong, fix);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ ligne corrigée dans : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(brutalReplace);