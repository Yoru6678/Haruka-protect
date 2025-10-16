const { EmbedBuilder } = require("../utils/embedBuilder");
const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Affiche les informations du serveur",
    async execute(message, args) {
        const guild = message.guild;
        
        const embed = new EmbedBuilder()
            .setTitle(`🛡️ Informations de ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .setColor("#36adfa")
            .addFields(
                { name: "👑 Propriétaire", value: `<@${guild.ownerId}>`, inline: true },
                { name: "🆔 ID", value: guild.id, inline: true },
                { name: "📅 Créé le", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "👥 Membres", value: `${guild.memberCount} membres`, inline: true },
                { name: "📊 Statistiques", value: `${guild.channels.cache.size} salons\
${guild.roles.cache.size} rôles`, inline: true },
                { name: "🔐 Niveau de vérification", value: `${guild.verificationLevel}`, inline: true }
            )
            .setFooter({ text: `Haruka Protect • ${guild.name}`, iconURL: guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};