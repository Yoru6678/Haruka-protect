const { EmbedBuilder } = require("../utils/embedBuilder");

module.exports = {
    name: "ping",
    description: "Affiche les statistiques et la latence du bot",
    async execute(message, args) {
        const latency = Date.now() - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        const uptime = process.uptime();
        
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);
        
        const embed = new EmbedBuilder()
            .setTitle("🏓 STATISTIQUES COMPLÈTES")
            .setColor("#5865F2")
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                {
                    name: "📡 Latence Message",
                    value: '\'\'\'${latency}ms\'\'\`,
                    inline: true
                },
                {
                    name: "⚡ API Discord",
                    value: '\'\'\'${apiLatency}ms\'\'\`,
                    inline: true
                },
                {
                    name: "🟢 Statut",
                    value: '\'\'\'EN LIGNE\'\'\`,
                    inline: true
                },
                {
                    name: "⏰ Uptime",
                    value: '\'\'\'${days}j ${hours}h ${minutes}m ${seconds}s\'\'\`,
                    inline: true
                },
                {
                    name: "📊 Serveurs",
                    value: '\'\'\'${message.client.guilds.cache.size}\'\'\`,
                    inline: true
                },
                {
                    name: "👥 Utilisateurs",
                    value: '\'\'\'${message.client.users.cache.size}\'\'\`,
                    inline: true
                },
                {
                    name: "💾 Mémoire",
                    value: '\'\'\'${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\'\'\`,
                    inline: true
                },
                {
                    name: "⚙️ Commandes",
                    value: '\'\'\'${message.client.commands.size}\'\'\`,
                    inline: true
                },
                {
                    name: "📡 Channels",
                    value: '\'\'\'${message.client.channels.cache.size}\'\'\`,
                    inline: true
                }
            )
            .setFooter({ 
                text: 'Haruka Protect • Performance optimale',
                iconURL: message.guild.iconURL()
            })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
};