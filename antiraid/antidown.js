(async () => {
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
    description: `Permet de configuréer l'antiraid.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'on') {
                ad.set(`config.${message.guild.id}.antidown`, true)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'anti down** est maintenant **activéé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
                
            } else if (args[0] == 'off') {
                ad.set(`config.${message.guild.id}.antidown`, false)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'anti down** est maintenant **désactivéé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}
})();