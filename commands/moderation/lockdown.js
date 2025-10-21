const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'lockdown',
    description: 'Description de la commande lockdown',
    usage: '+lockdown',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `lockdown` en développement.', 'lockdown 🔧 - Haruka Protect ⚡')] 
        });
    }
};