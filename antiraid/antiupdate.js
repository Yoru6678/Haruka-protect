(async () => {
const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const cl = db.table("Color")
const p = db.table("Prefix")
const agu = db.table("Guildupdate")

module.exports = {
    name: 'antiupdate',
    usage: 'antiupdate',
    description: `Permet de configurer l'antiraid.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            if (args[0] == 'on') {
                agu.set(`guildupdate_${message.guild.id}`, true)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**guildupdate** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                agu.set(`guildupdate_${message.guild.id}`, false)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**guildupdate** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}
})();