const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'stats',
    description: 'Description de la commande stats',
    usage: '+stats',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `stats` en développement.', 'stats 🔧 - Haruka Protect ⚡')] 
        });
    }
};