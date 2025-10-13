const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const al = db.table("AntiLink")

module.exports = {
    name: 'antilink',
    usage: 'antilink',
    description: `Permet de configurer l'antiraid.`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'all') {
                al.set(`config.${message.guild.id}.antilinkall`, true)
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** détecte maintenant **tous les liens**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            } else if (args[0] == 'invite') {
                al.set(`config.${message.guild.id}.antilinkinvite`, true)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** détecte maintenant **les invitations de serveurs**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            } else if (args[0] == 'off') {
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Options disponibles: all/invite/off`)
            }
        }
    }
}