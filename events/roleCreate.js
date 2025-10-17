const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const atr = db.table("antirolecreate");
const config = require('../config');

module.exports = {
    name: 'roleCreate`,
    once: false,

    async execute(client, role) {
        if (atr.get(`config.${role.guild.id}.antirolecreate') === true) {
            const audit = await role.guild.fetchAuditLogs({type: "ROLE_CREATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}') || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id || client.user.id === audit.executor.id) return;

            role.delete().catch(() => false);

            if (punish.get(`sanction_${role.guild.id}') === "ban") {
                role.guild.members.ban(audit.executor.id, { reason: 'AntiRole Create' }).catch(() => false);
            } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {
                role.guild.members.kick(audit.executor.id, { reason: 'AntiRole Create' }).catch(() => false);
            } else if (punish.get(`sanction_${role.guild.id}') === "derank") {
                const member = await role.guild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(r => {
                        if (r.name !== '@everyone`) {
                            member.roles.remove(r).catch(() => false);
                        }
                    });
                }
            }

            const embed = new (require("discord.js").EmbedBuilder)()
                .setDescription(`<@${audit.executor.id}> a créé le rôle `${role.name}`, je l'ai supprimé')')
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${role.guild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};