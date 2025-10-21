const { EmbedBuilder } = require('discord.js');
const { bot } = require('../config.js');

class HarukaEmbeds {
    static success(description, title = null) {
        const embed = new EmbedBuilder()
            .setColor('#57F287')
            .setDescription(\`✅ ${description}\`)
            .setFooter({ text: bot.footer })
            .setTimestamp();

        if (title) embed.setTitle(title);
        return embed;
    }

    static error(description, title = null) {
        const embed = new EmbedBuilder()
            .setColor('#ED4245')
            .setDescription(\`❌ ${description}\`)
            .setFooter({ text: bot.footer })
            .setTimestamp();

        if (title) embed.setTitle(title);
        return embed;
    }

    static info(description, title = null) {
        const embed = new EmbedBuilder()
            .setColor(bot.color)
            .setDescription(\`ℹ️ ${description}\`)
            .setFooter({ text: bot.footer })
            .setTimestamp();

        if (title) embed.setTitle(title);
        return embed;
    }

    static warn(description, title = null) {
        const embed = new EmbedBuilder()
            .setColor('#FEE75C')
            .setDescription(\`⚠️ ${description}\`)
            .setFooter({ text: bot.footer })
            .setTimestamp();

        if (title) embed.setTitle(title);
        return embed;
    }

    static custom(title, description, color = bot.color) {
        return new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setFooter({ text: bot.footer })
            .setTimestamp();
    }
}

module.exports = HarukaEmbeds;