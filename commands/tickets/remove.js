const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'remove',
    description: 'Description de la commande remove',
    usage: '+remove',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `remove` en développement.', 'remove �� - Haruka Protect ⚡')] 
        });
    }
};