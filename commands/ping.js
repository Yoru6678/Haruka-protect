const { EmbedBuilder } = require("../utils/embedBuilder");
module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    async execute(message) {
        const latency = Date.now() - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        
        const embed = EmbedBuilder.info(`🏓 Pong !\n📡 Latence: ${latency}ms\n🔧 API: ${apiLatency}ms`);
        message.channel.send({ embeds: [embed] });
    }
};