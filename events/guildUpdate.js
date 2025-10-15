const db = require("../db.js");
const Discord = require('discord.js');

const owner = db.table("Owner");
const rlog = db.table("raidlog");
const punish = db.table("Punition");
const wl = db.table("Whitelist");
const agu = db.table("Guildupdate");
const config = require('../config');

module.exports = {
    name: 'guildUpdate',
    once: false,

    async execute(client, oldGuild, newGuild) {
        if (agu.get(`guildupdate_${newGuild.id}`) === true) {
            const audit = await newGuild.fetchAuditLogs({type: "GUILD_UPDATE"}).then((audit) => audit.entries.first());
            if (!audit || !audit.executor) return;
            if (audit.executor.id === client.user.id) return;
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${newGuild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id) return;

            if (punish.get(`sanction_${newGuild.id}`) === "ban") {
                newGuild.members.ban(audit.executor.id, { reason: `Guild Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newGuild.id}`) === "kick") {
                newGuild.members.kick(audit.executor.id, { reason: `Guild Update` }).catch(() => false);
            } else if (punish.get(`sanction_${newGuild.id}`) === "derank") {
                const member = await newGuild.members.fetch(audit.executor.id).catch(() => null);
                if (member) {
                    member.roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            member.roles.remove(role).catch(() => false);
                        }
                    });
                }
            }

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a modifié les paramètres du serveur`)
                .setTimestamp()
                .setColor(config.bot.couleur);
            
            const raidlogId = await rlog.get(`${newGuild.id}.raidlog`);
            const logchannel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
        }
    }
};