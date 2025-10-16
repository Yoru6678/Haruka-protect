(async () => {
const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const p1 = db.table("Perm1")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")
const pgs = db.table("PermGs")
const pgp = db.table("PermGp")
const pga = db.table("PermGa")
const config = require("../config")
const footer = config.bot.footer

module.exports = {
    name: 'del',
    usage: 'del <perm1/perm2/perm3/permgs/permgp/permga> @role',
    category: "owner",
    description: `Permet de gérer les permissions des rôles.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (args[0] === "perm1") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la **perm 1**" })

                p1.set(`perm1_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la **perm 1**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "perm2") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la **perm 2**" })

                p2.set(`perm2_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la **perm 2**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "perm3") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la **perm 3**" })

                p3.set(`perm3_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la **perm 3**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "permgs") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la perm **Gestion Staff**" })

                pgs.set(`permgs_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la perm **Gestion Staff**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "permgp") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la perm **Gestion Permissions**" })

                pgp.set(`permgp_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la perm **Gestion Permissions**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }
            if (args[0] === "permga") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le rôle que vous souhaitez supprimer de la perm **Giveaway**" })

                pga.set(`permga_${message.guild.id}`, "Non Configuré")

                const embed1 = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`Le rôle ${role} n'a plus accès aux commandes de la perm **Giveaway**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }
        }
    }
}

})();