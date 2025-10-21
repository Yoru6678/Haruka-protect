const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'claim',
    description: 'Description de la commande claim',
    usage: '+claim',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `claim` en développement.', 'claim �� - Haruka Protect ⚡')] 
        });
    }
};