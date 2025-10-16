const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes disponibles",
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle("🛡️ Haruka Protect - Commandes")
            .setDescription("Système complet de protection et modération Discord")
            .setColor("#36adfa")
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                {
                    name: "🔧 Commandes Principales",
                    value: "\`\`\`+help • +ping • +config • +botinfo • +serverinfo • +userinfo • +avatar\`\`\`",
                    inline: false
                },
                {
                    name: "🛡️ Modération",
                    value: "\`\`\`+ban • +kick • +mute • +unmute • +warn • +clear • +lock • +unlock\`\`\`",
                    inline: true
                },
                {
                    name: "🔒 Protection", 
                    value: "\`\`\`+secur • +antiraid • +antilink • +sanction • +server lock\`\`\`",
                    inline: true
                },
                {
                    name: "🎫 Utilitaires",
                    value: "\`\`\`+ticket • +giveaway • +embed • +say • +mp\`\`\`",
                    inline: true
                }
            )
            .setFooter({ 
                text: `Haruka Protect • ${message.guild.name}`, 
                iconURL: message.guild.iconURL() 
            })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
};