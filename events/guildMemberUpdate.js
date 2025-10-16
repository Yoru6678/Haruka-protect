const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const ad = db.table("Antidown");
const config = require('../config');

module.exports = {
    name: 'guildMemberUpdate',
    once: false,

    async execute(client, oldMember, newMember) {
        if (ad.get(`config.${newMember.guild.id}.antidown`) === true) {
            const oldRoles = oldMember.roles.cache;
            const newRoles = newMember.roles.cache;
            
            const removedRoles = oldRoles.filter(role => !newRoles.has(role.id));
            
            if (removedRoles.size > 0) {
                const audit = await newMember.guild.fetchAuditLogs({
                    type: "MEMBER_ROLE_UPDATE",
                    limit: 1
                }).then(audit => audit.entries.first());
                
                if (!audit || !audit.executor) return;
                if (audit.executor.id === client.user.id) return;
                if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${newMember.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id) return;

                removedRoles.forEach(role => {
                    newMember.roles.add(role).catch(() => false);
                });

                if (punish.get(`sanction_${newMember.guild.id}`) === "ban") {
                    newMember.guild.members.ban(audit.executor.id, { reason: `Anti Down` }).catch(() => false);
                } else if (punish.get(`sanction_${newMember.guild.id}`) === "kick") {
                    newMember.guild.members.kick(audit.executor.id, { reason: `Anti Down` }).catch(() => false);
                } else if (punish.get(`sanction_${newMember.guild.id}`) === "derank") {
                    const member = await newMember.guild.members.fetch(audit.executor.id).catch(() => null);
                    if (member) {
                        member.roles.cache.forEach(r => {
                            if (r.name !== '@everyone') {
                                member.roles.remove(r).catch(() => false);
                            }
                        });
                    }
                }

                const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                    .setDescription(`<@${audit.executor.id}> a retiré des rôles à ${newMember.user.tag}`)
                    .setTimestamp()
                    .setColor(config.bot.couleur);
                
                const raidlogId = await rlog.get(`${newMember.guild.id}.raidlog`);
                const logchannel = client.channels.cache.get(raidlogId);
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
            }
        }
    }
};