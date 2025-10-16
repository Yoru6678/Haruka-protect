(async () => {
const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js")

const cl = db.table("Color")
const p = db.table("Prefix")
const config = require("../config")

module.exports = {
    name: 'prefix',
    usage: 'prefix',
    description: `Permet de changer le prefix du bot sur un serveur.`,
    async execute(message, args) {

        if (config.bot.buyer.includes(message.author.id)) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            let pf = await p.get(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.bot.prefixe

            const newprefix = args[0]

            if (!newprefix) return message.reply("Merci d'indiquer le prefix que vous souhaitez")

            if (newprefix.length > 5) return message.reply("Merci de choisir un prefix qui contient maximum 5 caractères")

            message.channel.send(`Mon prefix est désormais \`${newprefix}\``)
            p.set(`prefix_${message.guild.id}`, newprefix)

        }
    }
}
})();