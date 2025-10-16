const { EmbedBuilder } = require("../utils/embedBuilder");
module.exports = {
  name: "ping",
  description: "Affiche la latence du bot",
  execute(message) {
    const latency = Date.now() - message.createdTimestamp;
    message.channel.send({ embeds: [EmbedBuilder.info(`Pong ! Latence : ${latency}ms`)] });
  }
};