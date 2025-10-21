
const { EmbedBuilder } = require('discord.js');

module.exports = {
    success: (description, title = 'Succès ✅ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    error: (description, title = 'Erreur ❌ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    info: (description, title = 'Information ℹ️ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    warn: (description, title = 'Attention ⚠️ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    custom: (title, description, color = '#7289DA') => {
        return new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    }
};