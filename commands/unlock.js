const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
module.exports = {
  name: "unlock",
  description: "Déverrouille le salon",
  execute(message) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply("❌ Permission refusée.");
    }
    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true })
      .then(() => message.channel.send({ embeds: [EmbedBuilder.success("Salon déverrouillé.")] }))
      .catch(() => message.reply("Erreur lors du déverrouillage."));
  }
};