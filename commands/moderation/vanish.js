const HarukaEmbeds = require('../../utils/embeds');
const RoleManager = require('../../utils/roleManager');

module.exports = {
    name: 'vanish',
    description: 'Activer le mode vanish - Haruka Protect ⚡',
    usage: '+vanish',
    category: 'moderation',

    async execute(message, args, client) {
        const config = RoleManager.getRoleConfig(message.guild.id);
        
        const vanishRole = config.vanishRole ? 
            message.guild.roles.cache.get(config.vanishRole) : 
            message.guild.roles.cache.find(r => r.name.toLowerCase() === 'vanish');
            
        const whitelistRole = config.whitelistRole ? 
            message.guild.roles.cache.get(config.whitelistRole) : 
            message.guild.roles.cache.find(r => r.name.toLowerCase() === 'whitelist');

        if (!whitelistRole || !message.member.roles.cache.has(whitelistRole.id)) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Tu n'es pas dans la whitelist vanish.')] 
            });
        }

        if (!vanishRole) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error(
                    'Le rôle vanish n'existe pas. Utilise `+setvanishrole @role` pour le configurer.\n\n**Rôle par défaut:** `vanish`'
                )] 
            });
        }

        if (!message.member.roles.cache.has(vanishRole.id)) {
            return message.reply({ 
                embeds: [HarukaEmbeds.warn(`Tu n'as pas le rôle vanish.')] 
            });
        }

        try {
            await message.member.roles.remove(vanishRole);
            
            client.logger.command(`VANISH: ${message.author.tag} a activé le mode vanish`);
            
            return message.reply({ 
                embeds: [HarukaEmbeds.success(
                    `Ton rôle vanish a été retiré. Tu es maintenant invisible! ��\n\nUtilise `+unvanish` pour réapparaître.',
                    `Vanish activé ✅ - Haruka Protect ⚡'
                )] 
            });
        } catch (error) {
            client.logger.error('Erreur vanish:', error);
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Impossible de retirer le rôle vanish.')] 
            });
        }
    }
};