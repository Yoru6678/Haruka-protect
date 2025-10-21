const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'transcript',
    description: 'Description de la commande transcript',
    usage: '+transcript',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `transcript` en développement.', 'transcript 🔧 - Haruka Protect ⚡')] 
        });
    }
};