const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'dice',
    description: 'Description de la commande dice',
    usage: '+dice',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `dice` en développement.', 'dice �� - Haruka Protect ⚡')] 
        });
    }
};