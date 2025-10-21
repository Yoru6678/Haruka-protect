const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'withdraw',
    description: 'Description de la commande withdraw',
    usage: '+withdraw',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `withdraw` en développement.', 'withdraw �� - Haruka Protect ⚡')] 
        });
    }
};