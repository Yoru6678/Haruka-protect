const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const wl = db.table("Whitelist");
const cl = db.table("Color");

module.exports = {
    name: 'unwl',
    usage: 'unwl <@user>',
    description: 'Retire un membre de la whitelist',
    async execute(client, message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {
            const member = message.mentions.members.first();
            if (!member) return message.reply("Mentionnez un membre");

            wl.delete(`${message.guild.id}.${member.id}.wl`);

            const embed = new Discord.MessageEmbed()
                .setDescription(`❌ ${member.user.tag} retiré de la whitelist`)
                .setColor(color);
            message.channel.send({ embeds: [embed] });
        }
    }
};