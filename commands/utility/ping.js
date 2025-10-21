const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    usage: '+ping',
    category: 'utility',

    async execute(message, args, client) {
        const sent = await message.reply({ 
            embeds: [HarukaEmbeds.info('Mesure de la latence...')] 
        });

        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        const embed = HarukaEmbeds.custom(
            '�� Pong! - Haruka Protect ⚡',
            `**�� Latence du bot:** ${latency}ms\n**�� Latence de l'API:** ${apiLatency}ms\n**�� Uptime:** ${this.formatUptime(client.uptime)}`
        );

        await sent.edit({ embeds: [embed] });
    },

    formatUptime(uptime) {
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;
        return `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }
};