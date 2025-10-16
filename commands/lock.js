const { EmbedBuilder } = require("../utils/embedBuilder");
const { Permissions } = require("discord.js");
module.exports = {
  name: "lock",
  description: "Verrouille le salon",
  execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply("❌ Permission refusée.");
    }
    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false })
      .then(() => message.channel.send({ embeds: [EmbedBuilder.success("Salon verrouillé.")] }))
      .catch(() => message.reply("Erreur lors du verrouillage."));
  }
};