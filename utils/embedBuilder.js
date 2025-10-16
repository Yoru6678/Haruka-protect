const { EmbedBuilder } = require('discord.js');

class CustomEmbedBuilder {
    static success(message) {
        return new EmbedBuilder()
            .setDescription(`✅ ${message}`)
            .setColor('#00ff00');
    }
    
    static error(message) {
        return new EmbedBuilder()
            .setDescription(`❌ ${message}`)
            .setColor('#ff0000');
    }
    
    static info(message) {
        return new EmbedBuilder()
            .setDescription(`ℹ️ ${message}`)
            .setColor('#36adfa');
    }
}

module.exports = CustomEmbedBuilder;
module.exports.EmbedBuilder = EmbedBuilder;