const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
        
module.exports = {
    name: 'help',
    description: 'Affiche les commandes disponibles',
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Commandes Haruka Protect')
            .setDescription('Utilise `+commande` pour exécuter une commande')
            .addFields(
                { name: '🛡️ Modération', value: 'ban, kick, mute, clear, warn' },
                { name: '🔒 Protection', value: 'antiraid, antilink, secur' },
                { name: 'ℹ️ Informations', value: 'serverinfo, userinfo, botinfo' },
                { name: '🎫 Utilitaires', value: 'ticket, help, ping' }
            )
            .setColor('#36adfa')
            .setFooter({ text: 'Haruka Protect - Système complet de protection' });
            
        await message.channel.send({ embeds: [embed] });
    }
};