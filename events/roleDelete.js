const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const ard = db.table("antiroledelete");
const config = require('../config');

module.exports = {
    name: 'roleDelete',
    once: false,

    async execute(client, role) {
        if (ard.get(`config.${role.guild.id}.antiroledelete`) === true) {
            const audit = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id || client.user.id === audit.executor.id) return;

            if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                role.guild.members.ban(audit.executor.id, { reason: `AntiRole Delete` }).catch(() => false);
            } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {
                role.guild.members.kick(audit.executor.id, { reason: `AntiRole Delete` }).catch(() => false);
            } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {
                const member = await role.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(r => {
                        if (r.name !== '@everyone') {
                            member.roles.remove(r).catch(() => false);
                        }
                    });
                }
            }

            const embed = new (require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a supprimé le rôle `${role.name}``)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${role.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};