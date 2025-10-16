const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'gend',
    usage: 'gend <messageId>',
    description: 'Termine un giveaway',
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {
            const messageId = args[0];
            if (!messageId) return message.reply("Fournissez l'ID du message");

            client.giveawaysManager.end(messageId).then(() => {
                message.reply("✅ Giveaway terminé");
            }).catch(() => {
                message.reply("❌ Giveaway introuvable");
            });
        }
    }
};