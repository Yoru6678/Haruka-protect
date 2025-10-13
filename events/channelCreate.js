const db = require("../db.js");
const Discord = require('discord.js')

const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const atc = db.table("antichannelcreate")
const config = require('../config')

module.exports = {
    name: 'channelCreate',
    once: false,

    async execute(client, channel) {

        if (atc.get(`config.${channel.guild.id}.antichannelcreate`) == true) {
            const audit = await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then((audit) => audit.entries.first())
            if (!audit | !audit.executor) return
            if (audit.executor.id === client.user.id) return
                if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${channel.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id === true || client.user.id === audit.executor.id === true) return
            channel.delete()

            if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                channel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Create` })

            } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                channel.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                    if (role.name !== '@everyone') {
                        channel.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                    }
                })

            } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {

                channel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Create` })
            }
            else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                const member = await channel.guild.members.get(audit.executor.id)
                member.roles.set([], "AntiChannel Create").catch(() => false)
            }

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a tenté de \`créer\` un salon, il a été sanctionné.`)
                .setTimestamp()
            const logchannel = const raidlogId = await rlog.get(`${channel.guild.id}.raidlog`);
const channel = client.channels.cache.get(raidlogId);
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}