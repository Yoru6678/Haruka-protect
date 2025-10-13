const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js", ".ts", ".jsx", ".cjs", ".mjs"];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file === "node_modules") continue; // 🔒 ignore node_modules
      walk(fullPath, files);
    } else if (extensions.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixFile(filePath) {
  if (filePath === __filename) return; // 🔒 ignore this script itself

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // 1. Remplacer .fetch(...) par await .get(...)
  content = content.replace(/(\b\w+)\.fetch\(([^)]+)\)/g, "await $1.get($2)");

  // 2. Corriger client.await users.get(...)
  content = content.replace(/client\.await\s+users\.get\(/g, "client.users.fetch(");
  content = content.replace(/client\.await\s+users\.fetch\(/g, "client.users.fetch(");
  content = content.replace(/await\s+client\.await\s+users\.fetch\(/g, "await client.users.fetch(");
  content = content.replace(/await\s+client\.await\s+users\.get\(/g, "await client.users.fetch(");

  // 3. Corriger channel.await messages.get(...)
  content = content.replace(/channel\.await\s+messages\.get\(/g, "channel.messages.fetch(");
  content = content.replace(/channel\.await\s+messages\.fetch\(/g, "channel.messages.fetch(");
  content = content.replace(/await\s+channel\.await\s+messages\.get\(/g, "await channel.messages.fetch(");
  content = content.replace(/await\s+channel\.await\s+messages\.fetch\(/g, "await channel.messages.fetch(");

  // 4. Corriger client.await guilds.get(...)
  content = content.replace(/client\.await\s+guilds\.get\(/g, "client.guilds.fetch(");
  content = content.replace(/client\.await\s+guilds\.fetch\(/g, "client.guilds.fetch(");
  content = content.replace(/await\s+client\.await\s+guilds\.get\(/g, "await client.guilds.fetch(");
  content = content.replace(/await\s+client\.await\s+guilds\.fetch\(/g, "await client.guilds.fetch(");

  // 5. Ajouter async aux fonctions si nécessaire
  const usesAwait = content.includes("await ");
  const hasAsyncFunction = /async\s+function/.test(content) || /async\s+\(/.test(content);
  if (usesAwait && !hasAsyncFunction) {
    content = content.replace(/function\s+(\w+)\s*\(/, "async function $1(");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔧 Corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixFile);