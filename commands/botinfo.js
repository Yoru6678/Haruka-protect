const { EmbedBuilder } = require("../utils/embedBuilder");
const os = require('os');

module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    async execute(message, args) {
        const client = message.client;
        const uptime = process.uptime();
        
        const embed = new EmbedBuilder()
            .setTitle("🤖 Informations du Bot")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor("#36adfa")
            .addFields(
                { name: "🛡️ Nom", value: client.user.tag, inline: true },
                { name: "🆔 ID", value: client.user.id, inline: true },
                { name: "📅 Créé le", value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "📊 Statistiques", value: `${client.guilds.cache.size} serveurs\\n${client.users.cache.size} utilisateurs`, inline: true },
                { name: "⚡ Performances", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\\nPing: ${client.ws.ping}ms`, inline: true },
                { name: "🕒 Uptime", value: `${Math.floor(uptime / 86400)}j ${Math.floor(uptime / 3600) % 24}h ${Math.floor(uptime / 60) % 60}m ${Math.floor(uptime % 60)}s`, inline: true }
            )
            .setFooter({ text: `Haruka Protect • Développé par Yoru`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};