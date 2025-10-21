const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'monthly',
    description: 'Description de la commande monthly',
    usage: '+monthly',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `monthly` en développement.', 'monthly 🔧 - Haruka Protect ⚡')] 
        });
    }
};