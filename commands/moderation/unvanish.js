const HarukaEmbeds = require('../../utils/embeds');
const RoleManager = require('../../utils/roleManager');

module.exports = {
    name: 'unvanish',
    description: 'Désactiver le mode vanish - Haruka Protect ⚡',
    usage: '+unvanish',
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
                embeds: [HarukaEmbeds.error('Tu n\'es pas autorisé à utiliser cette commande.')] 
            });
        }

        if (!vanishRole) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error(
                    'Le rôle vanish n\'existe pas. Utilise `+setvanishrole @role` pour le configurer.\n\n**Rôle par défaut:** `vanish`'
                )] 
            });
        }

        if (message.member.roles.cache.has(vanishRole.id)) {
            return message.reply({ 
                embeds: [HarukaEmbeds.warn('Tu as déjà le rôle vanish.')] 
            });
        }

        try {
            await message.member.roles.add(vanishRole);
            
            client.logger.command(`UNVANISH: ${message.author.tag} a désactivé le mode vanish`);
            
            return message.reply({ 
                embeds: [HarukaEmbeds.success(
                    'Ton rôle vanish t\'a été redonné. Tu es maintenant visible! 👁️\n\nUtilise `+vanish` pour disparaître à nouveau.',
                    'Vanish désactivé ✅ - Haruka Protect ⚡'
                )] 
            });
        } catch (error) {
            client.logger.error('Erreur unvanish:', error);
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Impossible d\'ajouter le rôle vanish.')] 
            });
        }
    }
};
