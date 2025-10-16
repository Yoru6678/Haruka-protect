(async () => {
const db = require("../db.js");
const Discord = require('discord.js');
const config = require("../config");


const cl = db.table("Color");

module.exports = {
    name: 'ping',
    description: `Permet de voir la latence du bot en millisecondes.`,

    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .addField('BOT', `${client.ws.ping} ms`, true)
            .setColor(color);

        const msg = await message.channel.send({ embeds: [embed] });

        const api = msg.createdTimestamp - message.createdTimestamp;
        embed.addField("API", `${api} ms`, true);
        
        msg.edit({ embeds: [embed] });
    }
};
})();