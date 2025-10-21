const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'close',
    description: 'Description de la commande close',
    usage: '+close',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `close` en développement.', 'close 🔧 - Haruka Protect ⚡')] 
        });
    }
};