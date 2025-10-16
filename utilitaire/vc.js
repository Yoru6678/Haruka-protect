(async () => {
const db = require("../db.js");
const Discord = module.require("discord.js");

const cl = db.table("Color")
const config = require("../config")
 
module.exports = {
    name: 'vc',
    usage: 'vc',
    description: `Permet de montre les statistiques du serveur.`,
    async execute(client, message) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        const membre = message.guild.memberCount
        const online = message.guild.presences.cache.filter((presence) => presence.status !== "offline").size
        const vocal = message.guild.members.cache.filter(m => m.voice.channel).size
        const boost = message.guild.premiumSubscriptionCount || '0'

        const embed = new (require("discord.js").EmbedBuilder)()
            .setTitle(`${message.guild.name} > Statistiques`)
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`*Membres :* **${membre}** \n*En ligne :* **${online}** \n*En vocal :* **${vocal}**  \n*Boost :* **${boost}** `)
            .setFooter({ text: `${message.guild.name}` })
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
        message.delete();
    }
    }

})();