const fs = require("fs");
const path = require("path");

console.log("💣 NUCLEAR FIX - Remplacement complet des fichiers buggés\n");
console.log("=".repeat(50) + "\n");

// ============================================
// Fichiers de remplacement complets
// ============================================

const fixedFiles = {
    "moderation/kick.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const cl = db.table("Color");

module.exports = {
    name: 'kick',
    usage: 'kick <@user> [raison]',
    description: 'Expulse un membre du serveur',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || 
            message.member.roles.cache.has(p1.get(\`perm1_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p2.get(\`perm2_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p3.get(\`perm3_\${message.guild.id}\`)) ||
            config.bot.buyer.includes(message.author.id)) {

            const member = message.mentions.members.first();
            if (!member) return message.reply("Mentionnez un membre à expulser");

            const reason = args.slice(1).join(" ") || "Aucune raison fournie";

            member.kick(reason).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(\`✅ \${member.user.tag} a été expulsé\\nRaison: \${reason}\`)
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }).catch(() => {
                message.reply("Je ne peux pas expulser ce membre");
            });
        }
    }
};`,

    "moderation/lock.js": `const Discord = require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const cl = db.table("Color");

module.exports = {
    name: 'lock',
    usage: 'lock',
    description: 'Verrouille le salon actuel',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || 
            message.member.roles.cache.has(p1.get(\`perm1_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p2.get(\`perm2_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p3.get(\`perm3_\${message.guild.id}\`)) ||
            config.bot.buyer.includes(message.author.id)) {

            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription("🔒 Salon verrouillé")
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }).catch(() => {
                message.reply("Impossible de verrouiller ce salon");
            });
        }
    }
};`,

    "moderation/unlock.js": `const Discord = require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const cl = db.table("Color");

module.exports = {
    name: 'unlock',
    usage: 'unlock',
    description: 'Déverrouille le salon actuel',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || 
            message.member.roles.cache.has(p1.get(\`perm1_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p2.get(\`perm2_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p3.get(\`perm3_\${message.guild.id}\`)) ||
            config.bot.buyer.includes(message.author.id)) {

            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription("🔓 Salon déverrouillé")
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }).catch(() => {
                message.reply("Impossible de déverrouiller ce salon");
            });
        }
    }
};`,

    "moderation/temprole.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");
const ms = require("ms");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const cl = db.table("Color");

module.exports = {
    name: 'temprole',
    usage: 'temprole <@user> <@role> <durée>',
    description: 'Donne un rôle temporaire',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || 
            message.member.roles.cache.has(p1.get(\`perm1_\${message.guild.id}\`)) ||
            message.member.roles.cache.has(p2.get(\`perm2_\${message.guild.id}\`)) ||
            config.bot.buyer.includes(message.author.id)) {

            const member = message.mentions.members.first();
            const role = message.mentions.roles.first();
            const time = args[2];

            if (!member || !role || !time) {
                return message.reply("Usage: temprole <@user> <@role> <durée>");
            }

            const duration = ms(time);
            if (!duration) return message.reply("Durée invalide");

            member.roles.add(role).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(\`✅ \${role.name} donné à \${member.user.tag} pour \${time}\`)
                    .setColor(color);
                message.channel.send({ embeds: [embed] });

                setTimeout(() => {
                    member.roles.remove(role).catch(() => {});
                }, duration);
            }).catch(() => {
                message.reply("Impossible de donner ce rôle");
            });
        }
    }
};`,

    "parametre/unwl.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const wl = db.table("Whitelist");
const cl = db.table("Color");

module.exports = {
    name: 'unwl',
    usage: 'unwl <@user>',
    description: 'Retire un membre de la whitelist',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            const member = message.mentions.members.first();
            if (!member) return message.reply("Mentionnez un membre");

            wl.delete(\`\${message.guild.id}.\${member.id}.wl\`);

            const embed = new Discord.MessageEmbed()
                .setDescription(\`❌ \${member.user.tag} retiré de la whitelist\`)
                .setColor(color);
            message.channel.send({ embeds: [embed] });
        }
    }
};`,

    "gestion/end.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'gend',
    usage: 'gend <messageId>',
    description: 'Termine un giveaway',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            const messageId = args[0];
            if (!messageId) return message.reply("Fournissez l'ID du message");

            client.giveawaysManager.end(messageId).then(() => {
                message.reply("✅ Giveaway terminé");
            }).catch(() => {
                message.reply("❌ Giveaway introuvable");
            });
        }
    }
};`,

    "gestion/giveaway.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");
const ms = require("ms");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'giveaway',
    usage: 'giveaway <durée> <gagnants> <prix>',
    description: 'Lance un giveaway',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            const duration = args[0];
            const winnerCount = parseInt(args[1]);
            const prize = args.slice(2).join(" ");

            if (!duration || !winnerCount || !prize) {
                return message.reply("Usage: giveaway <durée> <gagnants> <prix>");
            }

            client.giveawaysManager.start(message.channel, {
                duration: ms(duration),
                winnerCount: winnerCount,
                prize: prize,
                hostedBy: message.author
            });
        }
    }
};`,

    "gestion/renew.js": `const Discord = require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'renew',
    usage: 'renew',
    description: 'Recrée le salon actuel',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            message.channel.clone().then((ch) => {
                ch.setParent(message.channel.parent);
                ch.setPosition(message.channel.position);
                message.channel.delete();
            }).catch(() => {
                message.reply("Impossible de renew ce salon");
            });
        }
    }
};`,

    "gestion/reroll.js": `const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'reroll',
    usage: 'reroll <messageId>',
    description: 'Reroll un giveaway',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            const messageId = args[0];
            if (!messageId) return message.reply("Fournissez l'ID du message");

            client.giveawaysManager.reroll(messageId).then(() => {
                message.reply("✅ Giveaway reroll");
            }).catch(() => {
                message.reply("❌ Giveaway introuvable");
            });
        }
    }
};`,

    "utilitaire/role.js": `const Discord = require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'role',
    usage: 'role <create/delete> <nom> [couleur]',
    description: 'Gère les rôles',
    async execute(client, message, args) {
        let color = await cl.get(\`color_\${message.guild.id}\`) || config.bot.couleur;

        if (owner.get(\`owners.\${message.author.id}\`) || config.bot.buyer.includes(message.author.id)) {
            const action = args[0];
            const roleName = args[1];

            if (action === "create") {
                const roleColor = args[2] || "RANDOM";
                message.guild.roles.create({
                    name: roleName,
                    color: roleColor
                }).then(role => {
                    message.reply("✅ Rôle " + role.name + " créé");
                }).catch(() => {
                    message.reply("Impossible de créer le rôle");
                });
            } else if (action === "delete") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === roleName);
                if (!role) return message.reply("Rôle introuvable");

                role.delete().then(() => {
                    message.reply("✅ Rôle supprimé");
                }).catch(() => {
                    message.reply("Impossible de supprimer le rôle");
                });
            }
        }
    }
};`,

    "events/rolecreate.js": `const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const atr = db.table("antirolecreate");
const config = require('../config');

module.exports = {
    name: 'roleCreate',
    once: false,

    async execute(client, role) {
        if (atr.get(\`config.\${role.guild.id}.antirolecreate\`) === true) {
            const audit = await role.guild.fetchAuditLogs({type: "ROLE_CREATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(\`owners.\${audit.executor.id}\`) || wl.get(\`\${role.guild.id}.\${audit.executor.id}.wl\`) || config.bot.buyer === audit.executor.id) return;

            role.delete().catch(() => false);

            if (punish.get(\`sanction_\${role.guild.id}\`) === "ban") {
                role.guild.members.ban(audit.executor.id, { reason: "AntiRole Create" }).catch(() => false);
            } else if (punish.get(\`sanction_\${role.guild.id}\`) === "kick") {
                role.guild.members.kick(audit.executor.id, { reason: "AntiRole Create" }).catch(() => false);
            }

            const embed = new Discord.MessageEmbed()
                .setDescription("<@" + audit.executor.id + "> a créé le rôle " + role.name + ", je l'ai supprimé")
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(\`\${role.guild.id}.raidlog\`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};`
};

// ============================================
// Remplacement des fichiers
// ============================================
console.log("📝 Remplacement des fichiers buggés...\n");

let replaced = 0;
Object.keys(fixedFiles).forEach(filePath => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, fixedFiles[filePath], "utf8");
    console.log("  ✅ Remplacé: " + filePath);
    replaced++;
});

console.log("\n✨ " + replaced + " fichiers remplacés !\n");

// ============================================
// RÉSUMÉ
// ============================================
console.log("=".repeat(50));
console.log("💣 NUCLEAR FIX TERMINÉ !");
console.log("=".repeat(50) + "\n");

console.log("✅ Tous les fichiers problématiques ont été complètement remplacés\n");

console.log("🚀 Prochaines étapes:");
console.log("\n1️⃣  Testez: node index.js");
console.log("2️⃣  Si OK: git add . && git commit -m 'Nuclear fix' && git push\n")