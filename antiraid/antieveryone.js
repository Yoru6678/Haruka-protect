const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ae = db.table("Antieveryone")

module.exports = {
    name: 'antieveryone',
    usage: 'antieveryone',
    description: `Permet de configurer l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'on') {
                ae.set(`config.${message.guild.id}.antieveryone`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antieveryone** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                ae.set(`config.${message.guild.id}.antieveryone`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antieveryone** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}