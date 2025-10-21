const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'gif',
    description: 'Description de la commande gif',
    usage: '+gif',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `gif` en développement.', 'gif 🔧 - Haruka Protect ⚡')] 
        });
    }
};