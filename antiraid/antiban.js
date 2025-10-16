(async () => {
const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ab = db.table("Antiban")

module.exports = {
    name: 'antiban',
    usage: 'antiban',
    description: `Permet de configuréer l'antiraid.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                ab.set(`config.${message.guild.id}.antiban`, true)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'antiban** est maintenant **activéé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                ab.set(`config.${message.guild.id}.antiban`, false)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'antiban** est maintenant **désactivéé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}

})();