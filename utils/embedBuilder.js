const { MessageEmbed } = require("discord.js");
const config = require("../config");

class EmbedBuilder {
  static success(desc) {
    return new MessageEmbed().setDescription("✅ " + desc).setColor("#00ff00").setTimestamp();
  }
  static error(desc) {
    return new MessageEmbed().setDescription("❌ " + desc).setColor("#ff0000").setTimestamp();
  }
  static warn(desc) {
    return new MessageEmbed().setDescription("⚠️ " + desc).setColor("#ffa500").setTimestamp();
  }
  static info(desc) {
    return new MessageEmbed().setDescription("ℹ️ " + desc).setColor(config.bot.couleur).setTimestamp();
  }
  static modLog(mod, action, target, reason = "Aucune raison") {
    return new MessageEmbed()
      .setTitle("🔨 Modération")
      .addField("👮 Modérateur", "<@" + mod.id + ">", true)
      .addField("🎯 Cible", "<@" + target.id + ">", true)
      .addField("📄 Action", action, true)
      .addField("📝 Raison", reason)
      .setColor("#ffa500")
      .setTimestamp();
  }
}
module.exports = EmbedBuilder;