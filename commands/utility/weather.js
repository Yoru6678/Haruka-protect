const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'weather',
    description: 'Description de la commande weather',
    usage: '+weather',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `weather` en développement.', 'weather 🔧 - Haruka Protect ⚡')] 
        });
    }
};