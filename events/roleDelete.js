const db = require("../db.js");
const Discord = require('discord.js')

const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const ard = db.table("antiroledelete")
const config = require('../config')

module.exports = {
    name: 'roleDelete',
    once: false,

    async execute(client, role, oldRole, newRole) {

        const audit = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(async (audit) => audit.entries.first());
        if (!audit | !audit.executor) return
        if (audit.executor === client.user.id) return

        if (await ard.get(`config.${role.guild.id}.antiroledelete`) == true) {

            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.bot.buyer === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if (audit.action == 'ROLE_DELETE') {

                if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                    role.guild.members.ban(audit.executor.id, { reason: `Antirôle Delete` })

                } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                    role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            role.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                    role.guild.members.kick(audit.executor.id, { reason: `Antirôle Delete` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`supprimer\` un rôle, il a été sanctionné`)
                    .setTimestamp()
                if (channel) const raidlogId = await rlog.get(`${role.guild.id}.raidlog`);
const channel = client.channels.cache.get(raidlogId);
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }

            role.guild.roles.create({
                name: role?.name,
                color: role?.color,
                hoist: role?.hoist,
                permissions: role?.permissions,
                position: role?.position,
                mentionable: role?.mentionable,
                reason: 'Anti-Role'
            })
        }
    }
}
