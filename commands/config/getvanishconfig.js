const HarukaEmbeds = require('../../utils/embeds');
const RoleManager = require('../../utils/roleManager');

module.exports = {
    name: 'getvanishconfig',
    description: 'Affiche la configuration vanish du serveur',
    usage: '+getvanishconfig',
    permissions: ['Administrator'],
    category: 'config',

    async execute(message, args, client) {
        const config = RoleManager.getRoleConfig(message.guild.id);
        
        const vanishRole = config.vanishRole ? message.guild.roles.cache.get(config.vanishRole) : null;
        const whitelistRole = config.whitelistRole ? message.guild.roles.cache.get(config.whitelistRole) : null;

        const embed = HarukaEmbeds.custom(
            'Configuration Vanish 🔹 - Haruka Protect ⚡',
            'Statut de la configuration du système vanish:'
        ).addFields(
            { 
                name: '🔹 Rôle Vanish', 
                value: vanishRole ? `${vanishRole} (\`${vanishRole.id}\`)` : '❌ Non configuré\n**Par défaut:** `vanish`', 
                inline: true 
            },
            { 
                name: '🔹 Rôle Whitelist', 
                value: whitelistRole ? `${whitelistRole} (\`${whitelistRole.id}\`)` : '❌ Non configuré\n**Par défaut:** `whitelist`', 
                inline: true 
            },
            { 
                name: '🔹 Commandes disponibles', 
                value: '`+vanish` - Disparaître\n`+unvanish` - Réapparaître\n`+setvanishrole` - Configurer le rôle\n`+setwhitelistrole` - Configurer la whitelist', 
                inline: false 
            }
        );

        await message.reply({ embeds: [embed] });
    }
};
