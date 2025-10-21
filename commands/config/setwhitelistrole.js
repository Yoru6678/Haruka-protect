const HarukaEmbeds = require('../../utils/embeds');
const RoleManager = require('../../utils/roleManager');

module.exports = {
    name: 'setwhitelistrole',
    description: 'Configurer le rôle whitelist pour vanish',
    usage: '+setwhitelistrole @role',
    permissions: ['Administrator'],
    category: 'config',

    async execute(message, args, client) {
        const role = message.mentions.roles.first();
        
        if (!role) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un rôle à définir comme whitelist vanish.')] 
            });
        }

        try {
            RoleManager.saveRoleConfig(message.guild.id, 'whitelistRole', role.id);
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `Le rôle ${role} a été défini comme whitelist vanish.\n\n**Rôle par défaut:** `whitelist``,
                    `Rôle whitelist configuré ✅ - Haruka Protect ⚡'
                )] 
            });

            client.logger.command(`SETWHITELISTROLE: ${message.author.tag} a défini le rôle whitelist: ${role.name}`);

        } catch (error) {
            client.logger.error(`Erreur setwhitelistrole:', error);
            await message.reply({ 
                embeds: [HarukaEmbeds.error('Une erreur est survenue lors de la configuration du rôle whitelist.')] 
            });
        }
    }
};