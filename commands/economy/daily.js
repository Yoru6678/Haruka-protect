const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'daily',
    description: 'Description de la commande daily',
    usage: '+daily',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `daily` en développement.', 'daily 🔧 - Haruka Protect ⚡')] 
        });
    }
};