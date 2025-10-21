const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'youtube',
    description: 'Description de la commande youtube',
    usage: '+youtube',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `youtube` en développement.', 'youtube 🔧 - Haruka Protect ⚡')] 
        });
    }
};