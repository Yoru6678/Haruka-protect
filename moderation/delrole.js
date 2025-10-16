const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const pgs = db.table("PermGs")

module.exports = {
    name: 'delrole',
    usage: 'delrole',
    description: `Permet de retirer un rôle à un membre.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {
            if (!args[0]) return message

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

                let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase())
                if (!member) return

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)

                await member.roles.remove(role.id, `Rôle retiré par ${message.author.tag}`);

                message.channel.send(`1 rôle retiré à 1 membre`)

                const embed = new (require("discord.js").EmbedBuilder)()
                    .setColor(color)
                    .setDescription(`➖ <@${message.author.id}> a utilisé la commande \`delrole\` sur ${member}\nRole retiré : ${role}`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const raidlogId = await ml.get(`${message.guild.id}.modlog`)
const logchannel = client.channels.cache.get(raidlogId);
const channel = client.channels.cache.get(raidlogId)
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            } else if (pgs.get(`permgs_${message.guild.id}`) === true && message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`))) {

                let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase())
                if (!member) return

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)

                await member.roles.remove(role.id, `Rôle retiré par ${message.author.tag}`);

                message.channel.send(`1 rôle retiré à 1 membre`)

                const embed = new (require("discord.js").EmbedBuilder)()
                    .setColor(color)
                    .setDescription(`➖ <@${message.author.id}> a utilisé la commande \`delrole\` sur ${member}\nRôle retiré : ${role}`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}