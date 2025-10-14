const fs = require("fs");
const path = require("path");

const filePath = path.join("moderation", "kick.js");

const bug = "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`)) {";
const fix = "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`))) {";

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(bug)) {
    content = content.replace(bug, fix);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Bug corrigé dans : ${filePath}`);
  } else {
    console.log(`ℹ️ Aucun bug trouvé dans : ${filePath}`);
  }
} else {
  console.log(`❌ Fichier introuvable : ${filePath}`);
}