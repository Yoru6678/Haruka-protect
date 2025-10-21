const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'pokemon',
    description: 'Description de la commande pokemon',
    usage: '+pokemon',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `pokemon` en développement.', 'pokemon 🔧 - Haruka Protect ⚡')] 
        });
    }
};