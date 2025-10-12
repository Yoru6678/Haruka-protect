const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = db.table("Owner")
const cl = db.table("Color")
const ct = db.table("CategorieTicket")
const footer = config.bot.footer


module.exports = {
    name: 'setcategorie',
    usage: 'setcategorie <id>',
    description: `Permet de changer la catégorie des tickets.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const funny = message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY")

            const newCategorie = message.guild.channels.cache.get(args[0] || funny.id);
            if (!newCategorie) return message.channel.send({ content: "Aucun catégorie trouvée !" })
            if (ct.get(`${message.guild.id}.categorie`) === newCategorie) return message.channel.send(`📧 | __Nouvelle catégorie :__ \`${ct.get(`${message.guild.id}.categorie`)}\``)
            else {
                ct.set(`${message.guild.id}.categorie`, args[0])
                message.channel.send(`📧 | __Nouvelle catégorie :__ ${newCategorie.name}`)
            }

        }
    }
}