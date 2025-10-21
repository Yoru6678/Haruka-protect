const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'define',
    description: 'Description de la commande define',
    usage: '+define',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `define` en développement.', 'define 🔧 - Haruka Protect ⚡')] 
        });
    }
};