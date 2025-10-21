const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'shuffle',
    description: 'Description de la commande shuffle',
    usage: '+shuffle',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `shuffle` en développement.', 'shuffle 🔧 - Haruka Protect ⚡')] 
        });
    }
};