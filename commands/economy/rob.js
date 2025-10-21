const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'rob',
    description: 'Description de la commande rob',
    usage: '+rob',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `rob` en développement.', 'rob 🔧 - Haruka Protect ⚡')] 
        });
    }
};