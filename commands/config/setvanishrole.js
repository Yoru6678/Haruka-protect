const HarukaEmbeds = require('../../utils/embeds');
const RoleManager = require('../../utils/roleManager');

module.exports = {
    name: 'setvanishrole',
    description: 'Configurer le rôle vanish pour le serveur',
    usage: '+setvanishrole @role',
    permissions: ['Administrator'],
    category: 'config',

    async execute(message, args, client) {
        const role = message.mentions.roles.first();
        
        if (!role) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un rôle à définir comme rôle vanish.')] 
            });
        }

        try {
            RoleManager.saveRoleConfig(message.guild.id, 'vanishRole', role.id);
            
            await message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `Le rôle ${role} a été défini comme rôle vanish.\n\n**Rôle par défaut:** `vanish``,
                    `Rôle vanish configuré ✅ - Haruka Protect ⚡'
                )] 
            });

            client.logger.command(`SETVANISHROLE: ${message.author.tag} a défini le rôle vanish: ${role.name}`);

        } catch (error) {
            client.logger.error(`Erreur setvanishrole:', error);
            await message.reply({ 
                embeds: [HarukaEmbeds.error('Une erreur est survenue lors de la configuration du rôle vanish.')] 
            });
        }
    }
};