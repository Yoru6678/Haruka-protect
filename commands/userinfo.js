const { EmbedBuilder } = require("../utils/embedBuilder");

module.exports = {
    name: "userinfo",
    description: "Affiche les informations d'un utilisateur",
    async execute(message, args) {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;
        
        const embed = new EmbedBuilder()
            .setTitle(`👤 Informations de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor("#36adfa")
            .addFields(
                { name: "🆔 ID", value: user.id, inline: true },
                { name: "📅 Compte créé", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "📥 A rejoint", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "🎭 Rôles", value: `${member.roles.cache.size - 1} rôles`, inline: true },
                { name: "🤖 Bot", value: user.bot ? "✅ Oui" : "❌ Non", inline: true },
                { name: "📊 Statut", value: `${member.presence?.status || "inconnu"}`, inline: true }
            )
            .setFooter({ text: `Haruka Protect • ${message.guild.name}`, iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};