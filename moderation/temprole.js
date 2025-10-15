const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");
const ms = require("ms");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const cl = db.table("Color");

module.exports = {
    name: 'temprole',
    usage: 'temprole <@user> <@role> <durée>',
    description: 'Donne un rôle temporaire',
    async execute(client, message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || 
            message.member.roles.cache.has(p1.get(`perm1_${message.guild.id}`)) ||
            message.member.roles.cache.has(p2.get(`perm2_${message.guild.id}`)) ||
            config.bot.buyer.includes(message.author.id)) {

            const member = message.mentions.members.first();
            const role = message.mentions.roles.first();
            const time = args[2];

            if (!member || !role || !time) {
                return message.reply("Usage: temprole <@user> <@role> <durée>");
            }

            const duration = ms(time);
            if (!duration) return message.reply("Durée invalide");

            member.roles.add(role).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(`✅ ${role.name} donné à ${member.user.tag} pour ${time}`)
                    .setColor(color);
                message.channel.send({ embeds: [embed] });

                setTimeout(() => {
                    member.roles.remove(role).catch(() => {});
                }, duration);
            }).catch(() => {
                message.reply("Impossible de donner ce rôle");
            });
        }
    }
};