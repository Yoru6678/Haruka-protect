const fs = require("fs");
const path = require("path");

const filePath = path.join("moderation", "ban.js");

const corrections = [
  {
    bug: "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`)) {",
    fix: "else if (p3.get(`perm3_${message.guild.id}`) === true && message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`))) {"
  },
  {
    bug: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)",
    fix: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));"
  },
  {
    bug: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)););",
    fix: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));"
  },
  {
    bug: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)))",
    fix: "const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));"
  }
];

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  for (const { bug, fix } of corrections) {
    if (content.includes(bug)) {
      content = content.split(bug).join(fix);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Tous les bugs corrigés dans : ${filePath}`);
  } else {
    console.log(`ℹ️ Aucun bug trouvé dans : ${filePath}`);
  }
} else {
  console.log(`❌ Fichier introuvable : ${filePath}`);
}