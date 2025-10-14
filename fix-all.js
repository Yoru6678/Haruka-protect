const fs = require("fs");
const path = require("path");

const filePath = path.join("moderation", "ban.js");

const bug = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)";
const fix = "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));";

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(bug)) {
    content = content.replace(bug, fix);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Corrigé dans : ${filePath}`);
  } else {
    console.log(`ℹ️ Aucun bug trouvé dans : ${filePath}`);
  }
} else {
  console.log(`❌ Fichier introuvable : ${filePath}`);
}