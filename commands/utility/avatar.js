const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'avatar',
    description: 'Afficher l'avatar d'un membre',
    usage: '+avatar [@membre]',
    category: 'utility',

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        
        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(`��️ Avatar de ${target.tag} - Haruka Protect ⚡`)
            .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({ text: `Demandé par ${message.author.tag}` });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Télécharger')
                .setStyle(ButtonStyle.Link)
                .setURL(target.displayAvatarURL({ size: 4096 }))
        );

        await message.reply({ embeds: [embed], components: [row] });
    }
};