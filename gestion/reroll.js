const db = require("../db.js");
const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""

const config = require("../config")
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const pga = db.table("PermGa")

module.exports = {
    name: 'reroll',
    usage: 'reroll',
    description: `Permet de relancer un giveaway sur le serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await pga.get(`permga_${message.guild.id}`)) || config.bot.buyer.includes(message.author.id)   === true) {

            let pf = await p.get(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.bot.prefixe

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (!args[0])
            return message.reply(`Aucun giveaway trouvé pour \`${args[0] || 'rien'}\``)
        
            await client.giveawaysManager.reroll(args[0], {
                messages: {
                    congrat: ':tada: Nouveau gagnant(s): {winners}! Félicitation, vous avez gagné **{this.prize}**!',
                    error: 'Aucun membre ne participe à ce giveaway, le(s) gagnant(s) ne peuvent pas être choisi!'
                }
            })
            .catch(() => message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``))
        }
    }
}