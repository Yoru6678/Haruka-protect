const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");


const cl = db.table("Color");
const config = require("../config");

module.exports = {
    name: 'pic',
    aliases: ['avatar'],
    usage: 'pic [membre/ID]',
    description: `Permet d'afficher l'avatar d'un utilisateur.`,
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        let member = message.mentions.users.first() || (args[0] ? await client.users.fetch(args[0]).catch(() => null) : null) || message.author;

        if (!member) {
            return message.channel.send("Veuillez mentionner un utilisateur ou fournir un ID valide.");
        }

        let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        let username = member.username;

        const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle(`${username}`)
            .setImage(avatar)
            .setColor(color);

        message.channel.send({ embeds: [embed] });
    }
};