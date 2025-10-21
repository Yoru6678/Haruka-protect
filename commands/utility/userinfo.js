const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'userinfo',
    description: 'Affiche les informations d\'un membre',
    usage: '+userinfo [@membre]',
    category: 'utility',

    async execute(message, args, client) {
        const target = message.mentions.members.first() || message.member;
        
        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`👤 Informations de ${target.user.tag} - Haruka Protect ⚡\`)
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: '🆔 ID', value: target.user.id, inline: true },
                { name: '📛 Surnom', value: target.nickname || 'Aucun', inline: true },
                { name: '🤖 Bot', value: target.user.bot ? 'Oui' : 'Non', inline: true },
                { name: '📅 Compte créé', value: \`<t:${Math.floor(target.user.createdTimestamp / 1000)}:R>\`, inline: true },
                { name: '📥 A rejoint', value: \`<t:${Math.floor(target.joinedTimestamp / 1000)}:R>\`, inline: true },
                { name: \`🎭 Rôles (${target.roles.cache.size - 1})\`, value: target.roles.cache.size > 1 ? target.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.toString()).slice(0, 10).join(', ') : 'Aucun', inline: false }
            )
            .setFooter({ text: \`Demandé par ${message.author.tag}\` });

        await message.reply({ embeds: [embed] });
    }
};