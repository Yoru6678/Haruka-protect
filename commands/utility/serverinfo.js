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
            .setTitle(`🏠 Informations du serveur - ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📛 Nom', value: guild.name, inline: true },
                { name: '🆔 ID', value: guild.id, inline: true },
                { name: '👑 Propriétaire', value: `${(await guild.fetchOwner()).user.tag}`, inline: true },
                { name: '📅 Créé le', value: `${guild.createdAt.toLocaleDateString('fr-FR')}`, inline: true },
                { name: '👥 Membres', value: `${guild.memberCount}` + ' membres', inline: true },
                { name: '🎭 Rôles', value: `${guild.roles.cache.size}` + ' rôles', inline: true },
                { name: '📁 Salons', value: `${guild.channels.cache.size}` + ' salons', inline: true },
                { name: '🔐 Niveau de vérification', value: this.getVerificationLevel(guild.verificationLevel), inline: true },
                { name: '💾 Boost', value: `Niveau ${guild.premiumTier} (${guild.premiumSubscriptionCount} boosts)`, inline: true }
            )
            .setFooter({ text: 'Haruka Protect ⚡' });

        await message.reply({ embeds: [embed] });
    },

    getVerificationLevel(level) {
        const levels = {
            NONE: 'Aucune',
            LOW: 'Faible',
            MEDIUM: 'Moyenne',
            HIGH: 'Élevée',
            VERY_HIGH: 'Très élevée'
        };
        return levels[level] || 'Inconnu';
    }
};