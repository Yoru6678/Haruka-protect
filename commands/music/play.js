const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'play',
    description: 'Description de la commande play',
    usage: '+play',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `play` en développement.', 'play 🔧 - Haruka Protect ⚡')] 
        });
    }
};