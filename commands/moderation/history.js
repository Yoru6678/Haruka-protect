const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'history',
    description: 'Description de la commande history',
    usage: '+history',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `history` en développement.', 'history 🔧 - Haruka Protect ⚡')] 
        });
    }
};