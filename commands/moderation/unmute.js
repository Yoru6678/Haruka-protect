const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'unmute',
    description: 'Lever le mute d\'un membre',
    usage: '+unmute @membre',
    permissions: ['ModerateMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre à unmute.')] 
            });
        }

        try {
            await target.timeout(null);
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `${target.user.tag} n'est plus muet.`,
                    'Mute levé ✅ - Haruka Protect ⚡'
                )] 
            });

            client.logger.command(`UNMUTE: ${target.user.tag} par ${message.author.tag}`);
            
        } catch (error) {
            await message.reply({ 
                embeds: [HarukaEmbeds.error('Une erreur est survenue lors du unmute.')] 
            });
        }
    }
};
