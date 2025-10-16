const { EmbedBuilder } = require("discord.js");
const config = require("../config");

class CustomEmbedBuilder {
    static success(desc) {
        return new EmbedBuilder()
            .setDescription("✅ " + desc)
            .setColor("#00ff00")
            .setTimestamp();
    }
    
    static error(desc) {
        return new EmbedBuilder()
            .setDescription("❌ " + desc)
            .setColor("#ff0000")
            .setTimestamp();
    }
    
    static warn(desc) {
        return new EmbedBuilder()
            .setDescription("⚠️ " + desc)
            .setColor("#ffa500")
            .setTimestamp();
    }
    
    static info(desc) {
        return new EmbedBuilder()
            .setDescription("ℹ️ " + desc)
            .setColor(config.bot.couleur)
            .setTimestamp();
    }
}

module.exports = CustomEmbedBuilder;