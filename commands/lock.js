const { EmbedBuilder } = require("../utils/embedBuilder");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "lock",
  description: "Verrouille le salon",
  async execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply("❌ Permission refusée.");
    }
    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
      message.channel.send({ embeds: [EmbedBuilder.success("Salon verrouillé.")] });
    } catch (error) {
      message.reply("Erreur lors du verrouillage.");
    }
  }
};