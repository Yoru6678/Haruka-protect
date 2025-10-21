const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ban',
    description: 'Bannir un membre du serveur',
    usage: '+ban @membre [raison]',
    permissions: ['BanMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre à bannir.')] 
            });
        }

        if (!target.bannable) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Je ne peux pas bannir ce membre.')] 
            });
        }

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        try {
            await target.ban({ reason });
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `${target.user.tag} a été banni du serveur.`,
                    'Membre banni ✅ - Haruka Protect ⚡'
                ).addFields(
                    { name: 'Raison', value: reason },
                    { name: 'Modérateur', value: message.author.tag }
                )] 
            });

            client.logger.command(`BAN: ${target.user.tag} par ${message.author.tag} - ${reason}`);
            
        } catch (error) {
            await message.reply({ 
                embeds: [HarukaEmbeds.error('Une erreur est survenue lors du bannissement.')] 
            });
        }
    }
};
