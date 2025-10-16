const Discord = require("discord.js").default || require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'renew',
    usage: 'renew',
    description: 'Recrée le salon actuel',
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {
            message.channel.clone().then((ch) => {
                ch.setParent(message.channel.parent);
                ch.setPosition(message.channel.position);
                message.channel.delete();
            }).catch(() => {
                message.reply("Impossible de renew ce salon");
            });
        }
    }
};