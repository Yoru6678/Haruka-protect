const db = require("../db.js");
const Discord = require("discord.js");


const cl = db.table("Color");
const config = require("../config");

module.exports = {
    name: 'find',
    usage: 'find [membre/ID]',
    description: `Permet de chercher un membre en vocal dans le serveur.`,
    async execute(client, message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!member) {
            return message.channel.send("Membre non trouvé. Veuillez mentionner un membre ou fournir un ID valide.");
        }

        const voiceChannel = member.voice.channel;

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .addField(
                ` `,
                voiceChannel ? `<#${voiceChannel.id}>` : `Le membre n'est pas en vocal.`,
                true
            );

        message.channel.send({ embeds: [embed] });
    }
};