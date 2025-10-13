const db = require("../db.js");
const Discord = require("discord.js");


const cl = db.table("Color");
const config = require("../config");
const fs = require('fs');
const moment = require('moment');
const footer = config.bot.footer;

const blacklist = [
    'discord.gg',
    'guns.lol',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
];

module.exports = {
    name: 'snipe',
    usage: 'snipe',
    description: `Permet d'afficher le dernier message supprimé sur le serveur`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`);
        if (color == null) color = config.bot.couleur;

        let isLinkall = false;

        const msg = client.snipes.get(message.channel.id);
        if (!msg) return message.channel.send("Aucun message n'a été supprimé récemment !");

        blacklist.forEach(l => {
            if (msg.content.includes(l)) {
                isLinkall = true;
            }
        });

        if (isLinkall == true) {
            const embedl = new Discord.MessageEmbed()
                .setDescription(`**${msg.author.tag}** \`\`\`discord.gg/******\`\`\``);
            return message.channel.send({ embeds: [embedl] });
        }


        const now = moment();
        moment.locale('fr');
        const messageTime = moment(msg.createdAt);
        let temps;

        if (now.isSame(messageTime, 'day')) {
            temps = `Aujourd'hui à ${messageTime.format('HH:mm')}`;
        } else {
            temps = messageTime.format('DD/MM/YYYY à HH:mm');
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`**${msg.author.tag}** \n${msg.content}`)
            .setColor(color)
            .setFooter({ text: `${footer}・${temps}` })
        
        if (msg.image) embed.setImage(msg.image);

        message.channel.send({ embeds: [embed] });
    }
};
