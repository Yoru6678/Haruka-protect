const db = require("../db.js");
const Discord = require('discord.js')

const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const aru = db.table("antiroleupdate")
const ad = db.table("Antidown")
const cl = db.table("Color")
const modlog = db.table("modlog")
const config = require('../config')

module.exports = {
    name: 'roleUpdate',
    once: false,

    async execute(client, oldRole, newRole) {

        let roleping = db.get(`role_${oldRole.guild.id}`)
        if (roleping === null) roleping = "@everyone"

        let color = await cl.get(`color_${oldRole.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (await ad.get(`config.${oldRole.guild.id}.antidown`) === true) {

            if (oldRole.rawPosition !== newRole.rawPosition) {
                const roles = oldRole.guild.roles.cache.filter(role => role.permissions.any('MANAGE_ROLES', "ADMINISTRATOR"))
                roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_ROLES", "ADMINISTRATOR"])))

                const embed = new Discord.MessageEmbed()
                    .setTitle('Potentiel Down Détécté')
                    .setDescription(`Le rôle ${newRole.name} a été déplacé de la position ${oldRole.rawPosition} à ${newRole.rawPosition}\nJ'ai désactivé les permissions __administrateur__ et __rôle__`)
                    .setColor(color)

                const channel = client.channels.cache.get(modlog.get(`${oldRole.guild.id}.modlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }
        }


        const audit = await oldRole.guild.fetchAuditLogs({type: "ROLE_UPDATE"}).then((audit) => audit.entries.first())
        if (!audit | !audit.executor) return
        if (audit.executor === client.user.id) return

        let isOn = await await aru.get(`config.${oldRole.guild.id}.antiroleupdate`)

        if (isOn == true) {

            if (audit?.executor?.id == oldRole?.guild?.ownerId) return

            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${oldRole.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id === true || client.user.id === audit.executor.id === true) return
            
            if (audit.action == 'ROLE_UPDATE') {

                try {
                    if (oldRole.name !== newRole.name) newRole.setName(oldRole.name)
                    if (oldRole.hexColor !== newRole.hexColor) newRole.setColor(oldRole.hexColor)
                    if (oldRole.permissions !== newRole.peermissions) newRole.setPermissions(oldRole.permissions)
                    if (oldRole.hoist !== newRole.hoist) newRole.setHoist(oldRole.hoist)
                    if (oldRole.mentionable !== newRole.mentionable) newRole.setMentionable(oldRole.mentionable)
                    if (oldRole.rawPosition !== newRole.narawPositionme) newRole.setPosition(oldRole.rawPosition)
                } catch(e){}

                if (punish.get(`sanction_${oldRole.guild.id}`) === "ban") {
                    oldRole.guild.members.ban(audit.executor.id, { reason: `Antirôle Update` })

                } else if (punish.get(`sanction_${oldRole.guild.id}`) === "derank") {

                    oldRole.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            oldRole.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${oldRole.guild.id}`) === "kick") {

                    oldRole.guild.members.kick(audit.executor.id, { reason: `Antirôle Update` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`modifier un rôle\`, il a été sanctionné`)
                    .setTimestamp()
                const channel = client.channels.cache.get(await rlog.get(`${oldRole.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}