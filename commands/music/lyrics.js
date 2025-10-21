const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'lyrics',
    description: 'Description de la commande lyrics',
    usage: '+lyrics',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `lyrics` en développement.', 'lyrics 🔧 - Haruka Protect ⚡')] 
        });
    }
};