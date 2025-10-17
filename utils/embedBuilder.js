const { EmbedBuilder } = require('discord.js');

class CustomEmbedBuilder {
    static success(message, title = null) {
        const embed = new EmbedBuilder()
            .setDescription(`✅ ${message}`)
            .setColor('#00ff00')
            .setTimestamp();
        if (title) embed.setTitle(title);
        return embed;
    }
    
    static error(message, title = null) {
        const embed = new EmbedBuilder()
            .setDescription(`❌ ${message}`)
            .setColor('#ff0000')
            .setTimestamp();
        if (title) embed.setTitle(title);
        return embed;
    }
    
    static info(message, title = null) {
        const embed = new EmbedBuilder()
            .setDescription(`ℹ️ ${message}`)
            .setColor('#5865F2')
            .setTimestamp();
        if (title) embed.setTitle(title);
        return embed;
    }
    
    static warning(message, title = null) {
        const embed = new EmbedBuilder()
            .setDescription(`⚠️ ${message}`)
            .setColor('#ffa500')
            .setTimestamp();
        if (title) embed.setTitle(title);
        return embed;
    }
    
    static modern(options = {}) {
        const embed = new EmbedBuilder()
            .setColor(options.color || '#5865F2')
            .setTimestamp();
        
        if (options.title) embed.setTitle(options.title);
        if (options.description) embed.setDescription(options.description);
        if (options.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options.image) embed.setImage(options.image);
        if (options.footer) embed.setFooter(options.footer);
        if (options.author) embed.setAuthor(options.author);
        if (options.fields) options.fields.forEach(f => embed.addFields(f));
        
        return embed;
    }
}

module.exports = CustomEmbedBuilder;
module.exports.EmbedBuilder = EmbedBuilder;