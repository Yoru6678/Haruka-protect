const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const aru = db.table("antiroleupdate");
const config = require('../config');

module.exports = {
    name: 'roleUpdate',
    once: false,

    async execute(client, oldRole, newRole) {
        if (aru.get(`config.${newRole.guild.id}.antiroleupdate`) === true) {
            const audit = await newRole.guild.fetchAuditLogs({type: "ROLE_UPDATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${newRole.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id || client.user.id === audit.executor.id) return;

            if (punish.get(`sanction_${newRole.guild.id}`) === "ban") {
                newRole.guild.members.ban(audit.executor.id, { reason: `AntiRole Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newRole.guild.id}`) === "kick") {
                newRole.guild.members.kick(audit.executor.id, { reason: `AntiRole Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newRole.guild.id}`) === "derank") {
                const member = await newRole.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(r => {
                        if (r.name !== '@everyone') {
                            member.roles.remove(r).catch(() => false);
                        }
                    });
                }
            }

            const embed = new (require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a modifié le rôle \`${newRole.name}\``)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${newRole.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};