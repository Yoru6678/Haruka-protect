const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'suggest',
    description: 'Description de la commande suggest',
    usage: '+suggest',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `suggest` en développement.', 'suggest 🔧 - Haruka Protect ⚡')] 
        });
    }
};