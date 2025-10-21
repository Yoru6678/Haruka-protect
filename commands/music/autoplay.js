const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'autoplay',
    description: 'Description de la commande autoplay',
    usage: '+autoplay',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `autoplay` en développement.', 'autoplay 🔧 - Haruka Protect ⚡')] 
        });
    }
};