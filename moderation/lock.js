const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const config = require("../config")
const fs = require('fs')
const moment = require('moment')
const p3 = db.table("Perm3")

module.exports = {
    name: 'lock',
    usage: 'lock',
    description: `Permet de verrouillé un salon.`,
    async execute(client, message, args, color) {

        const perm3 = await p3.get(`perm3_${message.guild.id}`)

 if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur


            if (args[0] === "all") {
                message.guild.channels.cache.forEach((channel, id) => {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        SEND_MESSAGES: false,
                    })
                }, `Tous les salons ont été fermés par ${message.author.tag}`);

                message.channel.send(`${message.guild.channels.cache.size} salons fermés`);

                const channellogs = alerte.get(`${message.guild.id}.modlog`)

                const embed = new Discord.MessageEmbed()
                    .setDescription(`:lock: | ${message.author.tag} vient de fermer tous les salons du serveur \nExécuteur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setColor(color)
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(channellogs)
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
                return
            }
        }
        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await p3.get(`perm3_${message.guild.id}`) || config.bot.buyer.includes(message.author.id)   === true) {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

            try {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        SEND_MESSAGES: false,
                }, `Salon fermé par ${message.author.tag}`);
            } catch (e) {
                console.log(e);
            }
            message.delete()
            message.channel.send(`Les membres ne peuvent plus parler dans <#${channel.id}>`);
        }



        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a \`verrouillé\` le salon <#${message.channel.id}>`)
            .setTimestamp()
            .setFooter({ text: `📚` })
        const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)
        if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

    }
}