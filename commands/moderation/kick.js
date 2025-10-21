const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'kick',
    description: 'Expulser un membre du serveur',
    usage: '+kick @membre [raison]',
    permissions: ['KickMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre à expulser.')] 
            });
        }

        if (!target.kickable) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Je ne peux pas expulser ce membre.')] 
            });
        }

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        try {
            await target.kick(reason);
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `${target.user.tag} a été expulsé du serveur.`,
                    `Membre expulsé ✅ - Haruka Protect ⚡'
                ).addFields(
                    { name: 'Raison', value: reason },
                    { name: 'Modérateur', value: message.author.tag }
                )] 
            });

            client.logger.command(`KICK: ${target.user.tag} par ${message.author.tag} - ${reason}`);
            
        } catch (error) {
            await message.reply({ 
                embeds: [HarukaEmbeds.error(`Une erreur est survenue lors de l'expulsion.')] 
            });
        }
    }
};