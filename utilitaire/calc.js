(async () => {
const db = require("../db.js");
const Discord = require("discord.js");


const cl = db.table("Color");
const config = require("../config");
const footer = config.bot.footer;

module.exports = {
    name: 'calc',
    usage: 'calc <calcul>',
    description: `Permet d'effectuer un calcul.`,
    async execute(client, message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (!args.length) {
            return message.channel.send("Veuillez fournir un calcul.");
        }

        const expression = args.join(' ');

        const safeEval = async (expr) => {
            if (/^[0-9+\-*/().\s]+$/.test(expr)) {
                return Function(`'use strict'; return (${expr})`)();
            } else {
                throw new Error("Erreur Maths");
            }
        };

        try {
            const result = safeEval(expression);

            const embed = new Discord.MessageEmbed()
                .setDescription(`Le résultat de \`${expression}\` est: **${result}**`)
                .setColor(color)

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            message.channel.send("Erreur : " + error.message + "\nPour les calculs: 1x1 = 1*1 | 1:1 = 1/1");
        }
    }
};
})();