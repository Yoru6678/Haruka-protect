const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'serverinfo',
    description: 'Affiche les informations du serveur',
    usage: '+serverinfo',
    category: 'utility',

    async execute(message, args, client) {
        const guild = message.guild;
        
        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(`�� ${guild.name} - Haruka Protect ⚡`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: `�� ID', value: guild.id, inline: true },
                { name: '�� Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
                { name: `�� Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: `�� Membres', value: `${guild.memberCount}`, inline: true },
                { name: `�� Statistiques', value: `�� Salons: ${guild.channels.cache.size}\
�� Rôles: ${guild.roles.cache.size}\
�� Émojis: ${guild.emojis.cache.size}`, inline: true },
                { name: `�� Boost', value: `Niveau: ${guild.premiumTier}\
Boosts: ${guild.premiumSubscriptionCount || 0}`, inline: true }
            )
            .setFooter({ text: `Demandé par ${message.author.tag}` });

        await message.reply({ embeds: [embed] });
    }
};