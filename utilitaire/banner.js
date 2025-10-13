(async () => {
const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config")

module.exports = {
    name: 'banner',
    usage: 'banner',
    description: `Permet d'afficher la bannière d'un utilisateur.`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        
        const url = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 }));

        const nobanner = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Bannière`)
            .setDescription(`${member.user.tag} n'a pas de bannière.`)
        if (!url) return message.channel.send({ embeds: [nobanner] });

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Bannière de ${member.user.tag}`)
            .setImage(`${url}`)
            .setFooter({ text: `4Protect`})
        await message.channel.send({ embeds: [embed] });
    }
}

})();