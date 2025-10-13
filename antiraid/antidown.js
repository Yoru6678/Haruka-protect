const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ad = db.table("Antidown")

module.exports = {
    name: 'antidown',
    usage: 'antidownn',
    description: `Permet de configurer l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'on') {
                ad.set(`config.${message.guild.id}.antidown`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti down** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
                
            } else if (args[0] == 'off') {
                ad.set(`config.${message.guild.id}.antidown`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti down** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}