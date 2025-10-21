const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'sell',
    description: 'Description de la commande sell',
    usage: '+sell',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `sell` en développement.', 'sell 🔧 - Haruka Protect ⚡')] 
        });
    }
};