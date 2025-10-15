const Discord = require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const cl = db.table("Color");

module.exports = {
    name: 'unlock',
    usage: 'unlock',
    description: 'Déverrouille le salon actuel',
    async execute(client, message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || 
            message.member.roles.cache.has(p1.get(`perm1_${message.guild.id}`)) ||
            message.member.roles.cache.has(p2.get(`perm2_${message.guild.id}`)) ||
            message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`)) ||
            config.bot.buyer.includes(message.author.id)) {

            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setDescription("🔓 Salon déverrouillé")
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }).catch(() => {
                message.reply("Impossible de déverrouiller ce salon");
            });
        }
    }
};