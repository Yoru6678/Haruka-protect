const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const atd = db.table("antichanneldelete");
const config = require('../config');

module.exports = {
    name: 'channelDelete',
    once: false,

    async execute(client, channel) {
        if (atd.get(`config.${channel.guild.id}.antichanneldelete`) === true) {
            const audit = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${channel.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id || client.user.id === audit.executor.id) return;

            if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                channel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Delete` }).catch(() => false);
            } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {
                channel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Delete` }).catch(() => false);
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

            const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a supprimé le salon \`${channel.name}\``)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${channel.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};