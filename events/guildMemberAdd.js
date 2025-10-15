const db = require("../db.js");
const Discord = require('discord.js');
const config = require('../config');

const atb = db.table("Antibot");
const lock = db.table("Serverlock");
const rlog = db.table("raidlog");

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(client, member) {
        if (member.user.bot && atb.get(`config.${member.guild.id}.antibot`) === true) {
            const audit = await member.guild.fetchAuditLogs({type: "BOT_ADD"}).then((audit) => audit.entries.first());
            if (audit && audit.executor && audit.executor.id !== client.user.id) {
                member.kick("AntiBot").catch(() => false);
                
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a ajouté un bot (${member.user.tag}), je l'ai expulsé`)
                    .setTimestamp()
                    .setColor(config.bot.couleur);
                
                const raidlogId = await rlog.get(`${member.guild.id}.raidlog`);
                const logchannel = client.channels.cache.get(raidlogId);
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
            }
        }

        if (lock.get(`serverlock_${member.guild.id}`) === "lock") {
            member.kick("Serveur verrouillé").catch(() => false);
        }
    }
};