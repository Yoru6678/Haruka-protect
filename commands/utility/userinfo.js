const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'userinfo',
    description: 'Affiche les informations sur un membre',
    usage: '+userinfo [@membre]',
    category: 'utility',

    async execute(message, args, client) {
        const target = message.mentions.members?.first() || message.member;
        const user = target.user;

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(`👤 Informations sur ${user.tag} - Haruka Protect ⚡`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '📛 Pseudonyme', value: `${user.tag}`, inline: true },
                { name: '🆔 ID', value: user.id, inline: true },
                { name: '📅 Compte créé', value: `${user.createdAt.toLocaleDateString('fr-FR')}`, inline: true },
                { name: '🔗 Serveur rejoint', value: `${target.joinedAt?.toLocaleDateString('fr-FR') || 'Inconnu'}`, inline: true },
                { name: '🎭 Rôles', value: `${target.roles.cache.size - 1}` + ' rôles', inline: true },
                { name: '📊 Statut', value: this.getStatus(target.presence?.status || 'offline'), inline: true }
            )
            .setFooter({ text: `Demandé par ${message.author.tag}` });

        await message.reply({ embeds: [embed] });
    },

    getStatus(status) {
        const statuses = {
            online: '🟢 En ligne',
            idle: '🟡 Inactif',
            dnd: '🔴 Ne pas déranger',
            offline: '⚫ Hors ligne'
        };
        return statuses[status] || '⚫ Inconnu';
    }
};