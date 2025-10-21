const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'market',
    description: 'Description de la commande market',
    usage: '+market',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `market` en développement.', 'market 🔧 - Haruka Protect ⚡')] 
        });
    }
};