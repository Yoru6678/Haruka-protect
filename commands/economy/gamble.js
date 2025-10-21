const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'gamble',
    description: 'Description de la commande gamble',
    usage: '+gamble',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `gamble` en développement.', 'gamble 🔧 - Haruka Protect ⚡')] 
        });
    }
};