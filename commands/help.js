const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes disponibles",
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle("🛡️ Haruka Protect - Commandes")
            .setDescription("Système complet de protection et modération")
            .setColor("#36adfa")
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                {
                    name: "🔧 Modération",
                    value: "\`+mute\` \`+unmute\` \`+warn\` \`+lock\` \`+unlock\` \`+ban\` \`+kick\`",
                    inline: true
                },
                {
                    name: "🛡️ Protection",
                    value: "\`+antiraid\` \`+antilink\` \`+secur\` \`+sanction\` \`+server lock\`",
                    inline: true
                },
                {
                    name: "ℹ️ Informations",
                    value: "\`+serverinfo\` \`+userinfo\` \`+botinfo\` \`+avatar\`",
                    inline: true
                },
                {
                    name: "🎫 Utilitaires",
                    value: "\`+ticket\` \`+ping\` \`+help\` \`+dmdban\`",
                    inline: true
                }
            )
            .setFooter({ 
                text: `Haruka Protect • ${message.guild.name}`, 
                iconURL: message.guild.iconURL() 
            })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};