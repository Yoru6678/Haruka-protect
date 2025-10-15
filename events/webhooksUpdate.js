const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const aw = db.table("antiwebhook");
const config = require('../config');

module.exports = {
    name: 'webhooksUpdate',
    once: false,

    async execute(client, channel) {
        if (aw.get(`config.${channel.guild.id}.antiwebhook`) === true) {
            const audit = await channel.guild.fetchAuditLogs({type: "WEBHOOK_CREATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${channel.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id) return;

            const webhooks = await channel.fetchWebhooks();
            webhooks.forEach(webhook => webhook.delete().catch(() => false));

            if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                channel.guild.members.ban(audit.executor.id, { reason: `AntiWebhook` }).catch(() => false);
            } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {
                channel.guild.members.kick(audit.executor.id, { reason: `AntiWebhook` }).catch(() => false);
            } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {
                const member = await channel.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            member.roles.remove(role).catch(() => false);
                        }
                    });
                }
            }

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a créé un webhook, je l'ai supprimé`)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${channel.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};