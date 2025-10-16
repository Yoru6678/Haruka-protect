const { EmbedBuilder } = require("../utils/embedBuilder");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Déverrouillée le salon",
  async execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply("❌ Permission refusée.");
    }
    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
      message.channel.send({ embeds: [EmbedBuilder.success("Salon déverrouilléé.")] });
    } catch (error) {
      message.reply("Erreur lors du déverrouilléage.");
    }
  }
};