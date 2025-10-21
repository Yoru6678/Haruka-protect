const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'buy',
    description: 'Description de la commande buy',
    usage: '+buy',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `buy` en développement.', 'buy 🔧 - Haruka Protect ⚡')] 
        });
    }
};