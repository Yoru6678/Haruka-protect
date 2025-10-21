const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'add',
    description: 'Description de la commande add',
    usage: '+add',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `add` en développement.', 'add �� - Haruka Protect ⚡')] 
        });
    }
};