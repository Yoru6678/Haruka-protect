const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");


const owner = db.table("Owner");
const cl = db.table("Color");
const config = require("../config");

module.exports = {
    name: 'theme',
    usage: 'theme <couleur>',
    description: `Permet de changer la couleur de l'embed dans config.json.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = args[0];
            if (!color) return message.reply("Merci d'indiquer la couleur que vous souhaitez");

            if (!/^#[0-9A-F]{6}$/i.test(color)) {
                return message.reply("Merci d'entrer une couleur au format hexadécimal (ex: #FF0000)");
            }
            
            cl.set(`color_${message.guild.id}`, color);
            
            message.channel.send(`La couleur des embed ont été modifiée en ${color}`);
        }
    }
}
