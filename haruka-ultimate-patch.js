const fs = require("fs");
const path = require("path");

console.log("🔥 HARUKA ULTIMATE PATCH - Initialisation\n" + "=".repeat(60));

// === 1. Corriger tous les fichiers JS ===
function fixContent(content) {
  return content
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/\.members\.get\(/g, ".members.fetch(")
    .replace(/client\.channels\.cache\.get\((.*?)\)\s*send\(/g, (m, p1) => {
      return `const chan = client.channels.cache.get(${p1});\nif (chan) chan.send(`;
    });
}

function fixAllJS(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      count += fixAllJS(filePath);
    } else if (file.endsWith(".js")) {
      const content = fs.readFileSync(filePath, "utf8");
      const fixed = fixContent(content);
      if (fixed !== content) {
        fs.writeFileSync(filePath, fixed, "utf8");
        console.log("✅ Corrigé :", filePath);
        count++;
      }
    }
  }
  return count;
}

const folders = ["antiraid", "events", "gestion", "logs", "moderation", "parametre", "utilitaire", "commands"];
let total = 0;
for (const folder of folders) {
  console.log("\n📂 Dossier :", folder);
  total += fixAllJS(folder);
}
if (fs.existsSync("index.js")) {
  const content = fs.readFileSync("index.js", "utf8");
  const fixed = fixContent(content);
  if (fixed !== content) {
    fs.writeFileSync("index.js", fixed, "utf8");
    console.log("✅ Corrigé : index.js");
    total++;
  }
}

// === 2. Préparer les dossiers ===
fs.mkdirSync("commands", { recursive: true });
fs.mkdirSync("utils", { recursive: true });
// === 3. Créer utils/embedBuilder.js ===
fs.writeFileSync("utils/embedBuilder.js", `const { MessageEmbed } = require("discord.js");
const config = require("../config");

class EmbedBuilder {
  static success(desc) {
    return new MessageEmbed().setDescription("✅ " + desc).setColor("#00ff00").setTimestamp();
  }
  static error(desc) {
    return new MessageEmbed().setDescription("❌ " + desc).setColor("#ff0000").setTimestamp();
  }
  static warn(desc) {
    return new MessageEmbed().setDescription("⚠️ " + desc).setColor("#ffa500").setTimestamp();
  }
  static info(desc) {
    return new MessageEmbed().setDescription("ℹ️ " + desc).setColor(config.bot.couleur).setTimestamp();
  }
  static modLog(mod, action, target, reason = "Aucune raison") {
    return new MessageEmbed()
      .setTitle("🔨 Modération")
      .addField("👮 Modérateur", "<@" + mod.id + ">", true)
      .addField("🎯 Cible", "<@" + target.id + ">", true)
      .addField("📄 Action", action, true)
      .addField("📝 Raison", reason)
      .setColor("#ffa500")
      .setTimestamp();
  }
}
module.exports = EmbedBuilder;`, "utf8");
console.log("✅ Créé : utils/embedBuilder.js");

// === 4. Créer utils/visualConfig.js ===
fs.writeFileSync("utils/visualConfig.js", `module.exports = {
  colors: {
    success: "#00ff00",
    error: "#ff0000",
    warning: "#ffa500",
    info: "#00bfff",
    mod: "#ffa500",
    raid: "#ff4444"
  },
  emojis: {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
    hammer: "🔨",
    shield: "🛡️"
  },
  footer: {
    text: "Haruka Protect",
    iconURL: null
  }
};`, "utf8");
console.log("✅ Créé : utils/visualConfig.js");

// === 5. Créer security.js ===
fs.writeFileSync("security.js", `const db = require("./db.js");
const config = require("./config");

module.exports = {
  checkOwner(message) {
    const ownerTable = db.table("Owner");
    return ownerTable.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id);
  },
  checkWhitelist(message) {
    const wl = db.table("Whitelist");
    return wl.get(\`\${message.guild.id}.\${message.author.id}.wl\`);
  },
  isAuthorized(message) {
    return this.checkOwner(message) || this.checkWhitelist(message);
  }
};`, "utf8");
console.log("✅ Créé : security.js");
// === 6. Fusion des commandes dans commands/ ===
const commands = {
  "ping.js": `const { EmbedBuilder } = require("../utils/embedBuilder");
module.exports = {
  name: "ping",
  description: "Affiche la latence du bot",
  execute(message) {
    const latency = Date.now() - message.createdTimestamp;
    message.channel.send({ embeds: [EmbedBuilder.info(\`Pong ! Latence : \${latency}ms\`)] });
  }
};`,

  "help.js": `const { EmbedBuilder } = require("../utils/embedBuilder");
module.exports = {
  name: "help",
  description: "Affiche la liste des commandes",
  execute(message) {
    const embed = EmbedBuilder.info("Voici les commandes disponibles :");
    embed.addFields(
      { name: "+ping", value: "Latence du bot" },
      { name: "+mute", value: "Mute un membre" },
      { name: "+unmute", value: "Démute un membre" },
      { name: "+warn", value: "Avertir un membre" },
      { name: "+warnlist", value: "Voir les avertissements" },
      { name: "+lock / +unlock", value: "Verrouille/déverrouille un salon" },
      { name: "+dmdban", value: "Créer un salon de ban privé" },
      { name: "+ticket", value: "Créer un ticket support" }
    );
    message.channel.send({ embeds: [embed] });
  }
};`,

  "lock.js": `const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
module.exports = {
  name: "lock",
  description: "Verrouille le salon",
  execute(message) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply("❌ Permission refusée.");
    }
    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false })
      .then(() => message.channel.send({ embeds: [EmbedBuilder.success("Salon verrouillé.")] }))
      .catch(() => message.reply("Erreur lors du verrouillage."));
  }
};`,

  "unlock.js": `const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
module.exports = {
  name: "unlock",
  description: "Déverrouille le salon",
  execute(message) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply("❌ Permission refusée.");
    }
    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true })
      .then(() => message.channel.send({ embeds: [EmbedBuilder.success("Salon déverrouillé.")] }))
      .catch(() => message.reply("Erreur lors du déverrouillage."));
  }
};`
};

// Écriture des fichiers dans commands/
for (const [filename, content] of Object.entries(commands)) {
  const filePath = path.join("commands", filename);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Commande ajoutée :", filename);
}
commands["mute.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
const { isAuthorized } = require("../security");

module.exports = {
  name: "mute",
  description: "Mute un membre",
  async execute(message, args) {
    if (!isAuthorized(message) || !message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.reply("❌ Permission refusée.");
    }

    const member = message.mentions.members.first();
    const duration = parseInt(args[1]);
    if (!member || isNaN(duration)) {
      return message.reply("Usage : +mute @membre durée(en minutes)");
    }

    let muteRole = message.guild.roles.cache.find(r => r.name === "mute");
    if (!muteRole) {
      muteRole = await message.guild.roles.create({ name: "mute", permissions: [] });
    }

    await member.roles.add(muteRole);
    message.channel.send({ embeds: [EmbedBuilder.success(\`\${member} a été muté pour \${duration} minutes.\`)] });

    setTimeout(() => {
      member.roles.remove(muteRole).catch(() => {});
      message.channel.send({ embeds: [EmbedBuilder.info(\`\${member} n'est plus muté.\`)] });
    }, duration * 60000);
  }
};`;

commands["unmute.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
const { isAuthorized } = require("../security");

module.exports = {
  name: "unmute",
  description: "Démute un membre",
  async execute(message, args) {
    if (!isAuthorized(message) || !message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.reply("❌ Permission refusée.");
    }

    const member = message.mentions.members.first();
    const muteRole = message.guild.roles.cache.find(r => r.name === "mute");
    if (!member || !muteRole || !member.roles.cache.has(muteRole.id)) {
      return message.reply("Ce membre n'est pas muté.");
    }

    await member.roles.remove(muteRole);
    message.channel.send({ embeds: [EmbedBuilder.success(\`\${member} a été démuté.\`)] });
  }
};`;

commands["warn.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { isAuthorized } = require("../security");

module.exports = {
  name: "warn",
  description: "Avertit un membre",
  async execute(message, args) {
    if (!isAuthorized(message)) return message.reply("❌ Permission refusée.");

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    if (!member || !reason) return message.reply("Usage : +warn @membre raison");

    const embed = EmbedBuilder.warn(\`Avertissement pour \${member.user.tag} : \${reason}\`);
    message.channel.send({ embeds: [embed] });
  }
};`;

commands["warnlist.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { isAuthorized } = require("../security");

module.exports = {
  name: "warnlist",
  description: "Liste des avertissements",
  async execute(message) {
    if (!isAuthorized(message)) return message.reply("❌ Permission refusée.");

    const members = message.guild.members.cache;
    const embed = EmbedBuilder.info("Liste des membres avertis :");
    embed.setDescription(members.map(m => \`\${m.user.tag} : 0 avertissements\`).join("\\n")); // Placeholder
    message.channel.send({ embeds: [embed] });
  }
};`;

commands["dmdban.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
const { isAuthorized } = require("../security");

module.exports = {
  name: "dmdban",
  description: "Crée un salon privé pour discuter du ban",
  async execute(message, args) {
    if (!isAuthorized(message) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return message.reply("❌ Permission refusée.");
    }

    const userToBan = message.mentions.members.first();
    if (!userToBan) return message.reply("Mentionne un utilisateur à bannir.");

    const category = await message.guild.channels.create("Bannissements", {
      type: "GUILD_CATEGORY",
      permissionOverwrites: [
        { id: message.guild.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: userToBan.id, allow: [Permissions.FLAGS.VIEW_CHANNEL] }
      ]
    });

    const channel = await message.guild.channels.create("bannissement", {
      type: "GUILD_TEXT",
      parent: category,
      permissionOverwrites: [
        { id: message.guild.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        { id: userToBan.id, allow: [Permissions.FLAGS.VIEW_CHANNEL] }
      ]
    });

    const embed = EmbedBuilder.warn(\`Demande de ban : \${userToBan}\`);
    await channel.send({ embeds: [embed] });
  }
};`;

commands["ticket.js"] = `const { EmbedBuilder } = require("../utils/embedBuilder");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Crée un ticket support",
  async execute(message) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("create_ticket").setLabel("🎫 Ouvrir un ticket").setStyle(ButtonStyle.Primary)
    );

    const embed = EmbedBuilder.info("Clique sur le bouton pour ouvrir un ticket.");
    await message.channel.send({ embeds: [embed], components: [row] });
  }
};`;
// === 7. Résumé final ===
console.log("\n" + "=".repeat(60));
console.log("🎉 HARUKA ULTIMATE PATCH TERMINÉ !");
console.log("=".repeat(60));
console.log(`✅ ${total} fichiers corrigés`);
console.log(`✅ ${Object.keys(commands).length} commandes fusionnées dans /commands`);
console.log("✅ Embeds modernisés (utils/embedBuilder.js)");
console.log("✅ Configuration visuelle (utils/visualConfig.js)");
console.log("✅ Sécurité ajoutée (security.js)");

console.log("\n🚀 Étapes suivantes :");
console.log("1️⃣ Lance ton bot avec : node index.js");
console.log("2️⃣ Teste les commandes : +help, +ping, +mute, +warn, +ticket, etc.");
console.log("3️⃣ Personnalise les salons logs, catégories, rôles si besoin");

console.log("\n💡 Pour utiliser les nouveaux embeds dans tes commandes :");
console.log("   const EmbedBuilder = require('./utils/embedBuilder');");
console.log("   message.channel.send({ embeds: [EmbedBuilder.success('Message')] });");

console.log("\n🔐 Pour sécuriser une commande :");
console.log("   const { isAuthorized } = require('./security');");
console.log("   if (!isAuthorized(message)) return;");