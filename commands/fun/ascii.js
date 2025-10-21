const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ascii',
    description: 'Description de la commande ascii',
    usage: '+ascii',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ascii` en développement.', 'ascii 🔧 - Haruka Protect ⚡')] 
        });
    }
};