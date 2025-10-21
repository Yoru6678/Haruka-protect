const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'banner',
    description: 'Description de la commande banner',
    usage: '+banner',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `banner` en développement.', 'banner 🔧 - Haruka Protect ⚡')] 
        });
    }
};