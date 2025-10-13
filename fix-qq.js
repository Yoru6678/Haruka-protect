const db = require("./db.js");
const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const dbFileName = "db.js";
const dbFilePath = path.join(baseDir, dbFileName);
const textFileExtensions = [".js", ".ts", ".jsx", ".cjs", ".mjs", ".json", ".txt"];

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return textFileExtensions.includes(ext) || ext === "";
}

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else if (isTextFile(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

function getRelativeDbPath(fromFile) {
  const relative = path.relative(path.dirname(fromFile), dbFilePath).replace(/\\/g, "/");
  return relative.startsWith(".") ? relative : "./" + relative;
}

function verifyDbFile() {
  if (!fs.existsSync(dbFilePath)) {
    console.log("❌ db.js est introuvable. Création automatique…");
    const content = `\n\nmodule.exports = db;\n`;
    fs.writeFileSync(dbFilePath, content, "utf8");
    console.log("✅ db.js créé avec succès.");
  } else {
    const content = fs.readFileSync(dbFilePath, "utf8");
    if (!content.includes("QuickDB") || !content.includes("new QuickDB")) {
      console.log("⚠️ db.js existe mais ne contient pas une instance valide. Réécriture…");
      const fixed = `\n\nmodule.exports = db;\n`;
      fs.writeFileSync(dbFilePath, fixed, "utf8");
      console.log("✅ db.js corrigé.");
    } else {
      console.log("✅ db.js est valide.");
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  const hasRequireQuickDb = content.includes(`require("quick.db")`) || content.includes(`require('quick.db')`);

  if (!hasRequireQuickDb) return;

  // Supprimer les lignes liées à quick.db
  content = content
    .replace(/const\s+\{\s*QuickDB\s*\}\s*=\s*require\(['"]quick\.db['"]\);?/g, "")
    .replace(/const\s+db\s*=\s*new\s+QuickDB\(\);?/g, "")
    .replace(/const\s+db\s*=\s*require\(['"]quick\.db['"]\);?/g, "");

  // Ajouter require vers db.js
  const relativeDbPath = getRelativeDbPath(filePath);
  content = `const db = require("${relativeDbPath}");\n` + content.trimStart();

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔁 Corrigé : ${filePath}`);
  }
}

verifyDbFile();
const allFiles = walk(baseDir);
allFiles.forEach(fixFile);