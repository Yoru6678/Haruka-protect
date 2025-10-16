const db = require("../db.js");
const { EmbedBuilder } = require('discord.js')
const Discord = require('discord.js')

const config = require("../config")
const owner = db.table("Owner")
const msglog = db.table("msglog")
const cl = db.table("Color")
const footer = config.bot.footer
 

module.exports = {
    name: 'messagelog',
    usage: 'messagelog <id>',
    description: `Permet de changer le salon des logs pour les messages.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (msglog.get(`${message.guild.id}.messagelog`) === newChannel) return message.channel.send(`ℹ️・__Nouveau salon des logs message :__ \`${msglog.get(`${message.guild.id}.messagelog`)}\``)
            else {
                msglog.set(`${message.guild.id}.messagelog`, newChannel.id)
                message.channel.send(`ℹ️・__Nouveau salon des logs :__ ${args[0]}`)

                const logs = msglog.get(`${message.guild.id}.messagelog`)

                const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                    .setColor(color)
                    .setTitle(`${message.author.tag} a défini ce salon commme salon des logs message`)
                    .setDescription(`ℹ️ Ce salon est désormais utilisé pour __toutes__ les **logs message** du serveur\nExécuteur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}