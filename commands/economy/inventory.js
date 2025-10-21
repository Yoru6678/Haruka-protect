const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'inventory',
    description: 'Description de la commande inventory',
    usage: '+inventory',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `inventory` en développement.', 'inventory 🔧 - Haruka Protect ⚡')] 
        });
    }
};