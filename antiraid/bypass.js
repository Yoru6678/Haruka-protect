(async () => {
const db = require("../db.js");
const Discord = require("discord.js")

const cl = db.table("Color")
const fs = require('fs')
const owner = db.table("Owner");
const config = require("../config")
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");

module.exports = {
    name: 'bypass',
    usage: 'bypass',
    description: 'Permet de voir quelles rank peuvent bypass des permissions.',
    async execute(message, args) {

    if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(p1) || message.member.roles.cache.has(p2) || message.member.roles.cache.has(p3) || config.bot.buyer.includes(message.author.id)  ) {

        let color = await cl.get(`color_${message.guild.id}')
        if (color == null) color = config.bot.couleur

        const embed = new (require("discord.js").EmbedBuilder)()
            .setColor(color)
            .setDescription('')
**\'antiadmin | Owner\\'**
**\\'antiban | Owner\'**
**\\'antiupdate | Owner\\'**
**\\'antibot | Owner\\'**
**\'antilink | Owner | Wl\\'**
**\\'antieveryone | Owner | Wl\'**
**\\'antichannel create | Owner | Wl\\'**
**\\'antichannel delete | Owner\\'**
**\'antichannel update | Owner\\'**
**\\'antirôle create | Owner\'**
**\\'antirôle delete | Owner\\'**
**\\'antirôle update | Owner\\'**
**\'antiwebhook | Owner\'**
`)

        message.channel.send({ embeds: [embed] });
    }
}
}
})();