const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const modlog = db.table("modlog")
const config = require("../config")
const fs = require('fs')
const moment = require('moment')
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")

module.exports = {
    name: 'unhide',
    usage: 'unhide',
    description: `Permet de unhide un salon',
    async execute(client, message, args, color) {

        const perm3 = await p3.get(`perm3_${message.guild.id}')

            let ecolor = await db.get(`color_${message.guild.id}`)
            if (ecolor == null) color = config.bot.couleur


            if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

                        channel.permissionOverwrites.edit(message.guild.id, {
                            ViewChannel: null,
                        });
                message.channel.send(`Les membres peuvent à nouveau voir le salon <#${channel.id}>');
                message.delete();
            }


            let channellogs = db.get(`${message.guild.id}.modlog`)
            if (channellogs == null) return

            const embed = new (require("discord.js").EmbedBuilder)()
                .setColor(ecolor)
                .setDescription(`<@${message.author.id}> a utilisé la commande `unhide` le salon <#${message.channel.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚' })
            const logchannel = client.channels.cache.get(channellogs)
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
    }
}