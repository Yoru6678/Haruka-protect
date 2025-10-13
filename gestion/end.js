const db = require("../db.js");
const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""

const config = require("../config")
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ml = db.table("giveawaylog")
const pga = db.table("PermGa")

module.exports = {
    name: 'end',
    usage: 'end',
    description: `Terminer un giveaway sur le serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await pga.get(`permga_${message.guild.id}`)) || config.bot.buyer.includes(message.author.id)   === true) {

            let pf = await p.get(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.bot.prefixe

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (!args[0])
            return message.reply(`Aucun giveaway trouvé pour \`${args[0] || '(rien)'}\``)

            client.giveawaysManager.end(args[0], 'Giveaway annulé, aucun membre n\'a participé.', {
                winMessage: 'Félicitation, {winners}! Vous avez gagné **{this.prize}**!',

                messages: {
                    congrat: ':tada: Félicitation {winners}, vous avez gagné **{this.prize}**!',
                    error: 'Aucun membre ne participe à ce giveaway, le(s) gagnant(s) ne peuvent pas être choisi!'
                }
            })
            .catch(() => message.reply(`Aucun giveaway trouvé pour \`${args[0] || 'rien'}\``))
            .then(() => {
                message.reply('Giveaway Fini.')

                const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`terminé un giveaway\` dans <#${giveawayChannel.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.giveawaylog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        })
        }
    }
}