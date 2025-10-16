const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");
const ms = require("ms");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'giveaway',
    usage: 'giveaway <durée> <gagnants> <prix>',
    description: 'Lance un giveaway',
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {
            const duration = args[0];
            const winnerCount = parseInt(args[1]);
            const prize = args.slice(2).join(" ");

            if (!duration || !winnerCount || !prize) {
                return message.reply("Usage: giveaway <durée> <gagnants> <prix>");
            }

            client.giveawaysManager.start(message.channel, {
                duration: ms(duration),
                winnerCount: winnerCount,
                prize: prize,
                hostedBy: message.author
            });
        }
    }
};