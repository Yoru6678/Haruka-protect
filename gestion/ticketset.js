(async () => {
const db = require("../db.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const config = require('../config')

const owner = db.table("Owner")
const cl = db.table("Color")
const p = db.table("Prefix")

module.exports = {
    name: 'ticketset',
    usage: 'ticketset',
    category: "owner",
    description: `Commande ticket set.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            let pf = await p.get(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.prefix

            message.delete()
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder(`Cliquez pour ouvrir un ticket`)
                        .addOptions([
                            {
                                label: 'Ticket',
                                emoji: '998562005155860510',
                                description: `Cliquez ici si vous souhaitez ouvrir un ticket`,
                                value: 'open',
                            },
                            {
                                label: 'Annuler',
                                emoji: '988389407730040863',
                                description: "Annuler l'action",
                                value: 'rien',
                            },
                        ])
                );

            message.channel.send({
                embeds: [{
                    title: `__Support ${message.guild.name}__`,
                    description: `**Pour ouvrir un Ticket cliquez sur l'un des menus ci-dessous et choisissez l'option qui correspond à votre demande**`,
                    color: color,
                    footer: { text: `Tout troll pourra être sanctionné d'un bannissement` }
                }],
                components: [row]
            })
        }
    }
}
})();