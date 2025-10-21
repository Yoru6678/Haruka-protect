const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'skip',
    description: 'Description de la commande skip',
    usage: '+skip',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `skip` en développement.', 'skip 🔧 - Haruka Protect ⚡')] 
        });
    }
};