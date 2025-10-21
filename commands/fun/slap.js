const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'slap',
    description: 'Description de la commande slap',
    usage: '+slap',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `slap` en développement.', 'slap 🔧 - Haruka Protect ⚡')] 
        });
    }
};