(async () => {
const db = require("../db.js");
const Discord = require("discord.js");


const owner = db.table("Owner");
const config = require("../config");
const cl = db.table("Color");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");

module.exports = {
    name: 'all',
    usage: 'all <bots/admins>',
    description: `Permet d'afficher la liste des administrateurs ou des bots présents sur le serveur.`,
    async execute(client, message, args) {

        if (!args[0]) {
            return message.channel.send("Veuillez spécifier si vous souhaitez afficher les bots ou les admins.");
        }

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(p2) || message.member.roles.cache.has(p3) || config.bot.buyer.includes(message.author.id)  ) {

            let color = await cl.get(`color_${message.guild.id}`);
            if (color == null) color = config.bot.couleur;

            if (args[0] === 'bots') {
                let bots = message.guild.members.cache.filter(m => m.user.bot).size;
                let botNames = message.guild.members.cache.filter(m => m.user.bot).map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n");
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Liste des Bots`)
                    .setDescription(`${botNames}`)
                    .setFooter({ text: `Total: ${bots}` })
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }
            else if (args[0] === 'admins') {
                var admins = message.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR") && !member.user.bot);
                var adminNames = admins.map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n");
                for (let i = 0; i < adminNames.length; i += 1995) {
                    const content = adminNames.substring(i, Math.min(adminNames.length, i + 1995));
                    var embed = new Discord.MessageEmbed()
                        .setTitle(`Liste des Administrateurs.`)
                        .setDescription(`\n ${content}`)
                        .setFooter({ text: `Total : ${admins.size}` })
                        .setColor(color);
                    message.channel.send({ embeds: [embed] });
                }
            } else {
                return message.channel.send("Veuillez spécifier si vous souhaitez afficher les bots ou les admins.");
            }
        }
    }
};

})();