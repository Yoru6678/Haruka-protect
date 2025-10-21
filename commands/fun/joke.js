const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'joke',
    description: 'Description de la commande joke',
    usage: '+joke',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `joke` en développement.', 'joke 🔧 - Haruka Protect ⚡')] 
        });
    }
};