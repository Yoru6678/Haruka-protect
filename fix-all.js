const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js"];

const fixes = [
  {
    file: "moderation/ban.js",
    bug: "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`)) {",
    fix: "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`))) {"
  },
  {
    file: "moderation/addrole.js",
    bug: "} else if (pgs.get(`permgs_${message.guild.id}`) === true && message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`)) {",
    fix: "} else if (pgs.get(`permgs_${message.guild.id}`) === true && message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`))) {"
  }
];

for (const { file, bug, fix } of fixes) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    if (content.includes(bug)) {
      content = content.replace(bug, fix);
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Corrigé dans : ${file}`);
    } else {
      console.log(`ℹ️ Aucun bug trouvé dans : ${file}`);
    }
  } else {
    console.log(`❌ Fichier introuvable : ${file}`);
  }
}