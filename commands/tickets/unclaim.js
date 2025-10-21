const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'unclaim',
    description: 'Description de la commande unclaim',
    usage: '+unclaim',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `unclaim` en développement.', 'unclaim 🔧 - Haruka Protect ⚡')] 
        });
    }
};