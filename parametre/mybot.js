(async () => {
const db = require("../db.js");
const { EmbedBuilder } = require('discord.js');
require("moment-duration-format");
const config = require("../config")

const cl = db.table("Color")
const footer = config.bot.footer

module.exports = {
    name: "mybot",
    async execute(client, message, args, data, color) {

        if (config.bot.buyer.includes(message.author.id)) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const embed = new EmbedBuilder()
                .setTitle('Votre Bot')
                .setDescription(`Cliquez ici pour inviter votre bot [${client.user.tag}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
                .setFooter({text: footer})
                .setColor(color)
                
            message.reply({ embeds: [embed] })
        }
    }
}
})();