const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const aba = db.table("Antiban");
const config = require('../config');

module.exports = {
    name: 'guildBanAdd',
    once: false,

    async execute(client, ban) {
        if (aba.get(`config.${ban.guild.id}.antiban`) === true) {
            const audit = await ban.guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${ban.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id) return;

            ban.guild.members.unban(ban.user.id, "AntiBan").catch(() => false);

            if (punish.get(`sanction_${ban.guild.id}`) === "ban") {
                ban.guild.members.ban(audit.executor.id, { reason: `AntiBan` }).catch(() => false);
            } else if (punish.get(`sanction_${ban.guild.id}`) === "kick") {
                ban.guild.members.kick(audit.executor.id, { reason: `AntiBan` }).catch(() => false);
            } else if (punish.get(`sanction_${ban.guild.id}`) === "derank") {
                const member = await ban.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            member.roles.remove(role).catch(() => false);
                        }
                    });
                }
            }

            const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a banni ${ban.user.tag}, je l'ai débanni`)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${ban.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};