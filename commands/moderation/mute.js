const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'mute',
    description: 'Rendre muet un membre',
    usage: '+mute @membre [durée] [raison]',
    permissions: ['ModerateMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre à rendre muet.')] 
            });
        }

        const duration = args[1] || '60m';
        const reason = args.slice(2).join(' ') || 'Aucune raison spécifiée';

        try {
            const timeoutDuration = this.parseDuration(duration);
            await target.timeout(timeoutDuration, reason);
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    \`${target.user.tag} a été rendu muet pour ${duration}.\`,
                    'Membre muet ✅ - Haruka Protect ⚡'
                ).addFields(
                    { name: 'Raison', value: reason },
                    { name: 'Modérateur', value: message.author.tag }
                )] 
            });

            client.logger.command(\`MUTE: ${target.user.tag} par ${message.author.tag} - ${duration} - ${reason}\`);
            
        } catch (error) {
            await message.reply({ 
                embeds: [HarukaEmbeds.error('Une erreur est survenue lors du mute.')] 
            });
        }
    },

    parseDuration(duration) {
        const units = { 's': 1000, 'm': 60000, 'h': 3600000, 'd': 86400000 };
        const match = duration.match(/^(\d+)([smhd])$/);
        return match ? parseInt(match[1]) * units[match[2]] : 3600000;
    }
};