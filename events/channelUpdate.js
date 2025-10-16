const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const acu = db.table("antichannelupdate");
const config = require('../config');

module.exports = {
    name: 'channelUpdate',
    once: false,

    async execute(client, oldChannel, newChannel) {
        if (acu.get(`config.${newChannel.guild.id}.antichannelupdate`) === true) {
            const audit = await newChannel.guild.fetchAuditLogs({type: "CHANNEL_UPDATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${newChannel.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id || client.user.id === audit.executor.id) return;

            if (punish.get(`sanction_${newChannel.guild.id}`) === "ban") {
                newChannel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newChannel.guild.id}`) === "kick") {
                newChannel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newChannel.guild.id}`) === "derank") {
                const member = await newChannel.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            member.roles.remove(role).catch(() => false);
                        }
                    });
                }
            }

            const embed = new (require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a modifié le salon `${newChannel.name}``)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${newChannel.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};