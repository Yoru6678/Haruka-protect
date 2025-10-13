const db = require("./db.js");
const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const dbFileName = "db.js";
const textFileExtensions = [".js", ".ts", ".jsx", ".cjs", ".mjs", ".txt", ".config", ".yaml", ".yml", ".json"];

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return textFileExtensions.includes(ext) || ext === "";
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else if (isTextFile(fullPath)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getRelativeDbPath(fromFile) {
  const relative = path.relative(path.dirname(fromFile), path.join(baseDir, dbFileName));
  let relPath = relative.replace(/\\/g, "/");
  if (!relPath.startsWith(".")) relPath = "./" + relPath;
  if (!relPath.endsWith(".js")) relPath = relPath.replace(/\.js$/, "");
  return relPath;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  const hasRequireQuickDb = content.includes(`require("quick.db")`) || content.includes(`require('quick.db')`);
  const hasQuickDbImport = content.includes(`{ QuickDB }`);
  const hasNewQuickDb = content.includes(`new QuickDB()`);

  if (hasRequireQuickDb) {
    const relativeDbPath = getRelativeDbPath(filePath);

    // Supprimer les lignes liées à quick.db
    content = content
      .replace(/const\s+\{\s*QuickDB\s*\}\s*=\s*require\(['"]quick\.db['"]\);?/g, "")
      .replace(/const\s+db\s*=\s*new\s+QuickDB\(\);?/g, "")
      .replace(/const\s+db\s*=\s*require\(['"]quick\.db['"]\);?/g, "");

    // Ajouter require vers db.js
    content = `const db = require("${relativeDbPath}");\n` + content.trimStart();
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔁 Migré vers db.js : ${filePath}`);
  }
}

function ensureDbFile() {
  const dbPath = path.join(baseDir, dbFileName);
  if (!fs.existsSync(dbPath)) {
    const content = `\n\nmodule.exports = db;\n`;
    fs.writeFileSync(dbPath, content, "utf8");
    console.log(`✅ Fichier ${dbFileName} créé.`);
  }
}

ensureDbFile();
const allFiles = walk(baseDir);
allFiles.forEach(fixFile);