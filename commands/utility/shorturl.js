const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'shorturl',
    description: 'Description de la commande shorturl',
    usage: '+shorturl',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `shorturl` en développement.', 'shorturl 🔧 - Haruka Protect ⚡')] 
        });
    }
};