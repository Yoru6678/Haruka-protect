const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'shop',
    description: 'Description de la commande shop',
    usage: '+shop',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `shop` en développement.', 'shop �� - Haruka Protect ⚡')] 
        });
    }
};