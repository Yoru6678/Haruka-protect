(async () => {
const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js")

const owner = db.table("Owner")
const p3 = db.table("Perm3")
const cl = db.table("Color")
const config = require("../config")

module.exports = {
    name: 'buttonrole',
    usage: 'buttonrole',
    description: `Permet de faire un menu buttonrole.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            const msg = args.slice(1).join(" ")

            if (!role) return message.reply(`buttonrole <role> <description>`)
            if (!msg) return message.reply(`buttonrole <role> <description>`)
            if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("Administrator") || role.permissions.has("ManageChannels") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("ManageRoles")) {
                return message.reply("Le menu n'a pas pu être créé car le rôle sélectionné a des permissions **dangereuses**")
            }

            const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle(`Choisi ton rôle`)
                .setDescription(`${msg}\n__Rôle :__ ${role}`)
                .setColor(color)


            const rolemenu = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('roles')
                        .setLabel(role.name)
                        .setStyle('Success')
                )

            const msgg = await message.channel.send({ embeds: [embed], components: [rolemenu] })

            await db.set(`buttonrole_${msgg.id}`, role.id)

        }
    }
}

})();