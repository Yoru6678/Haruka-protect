const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'fox',
    description: 'Description de la commande fox',
    usage: '+fox',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `fox` en développement.', 'fox 🔧 - Haruka Protect ⚡')] 
        });
    }
};