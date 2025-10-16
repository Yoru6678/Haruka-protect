(async () => {
const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const atb = db.table("Antibot")

module.exports = {
    name: 'antibot',
    usage: 'antibot',
    description: `Permet de configurer l'antiraid.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                atb.set(`config.${message.guild.id}.antibot`, true)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'antibot** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                atb.set(`config.${message.guild.id}.antibot`, false)
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**L'antibot** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètre invalide. Veuillez spécifier **on** ou **off**`)
            }
        }
    }
}
})();