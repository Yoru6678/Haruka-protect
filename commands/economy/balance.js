const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'balance',
    description: 'Description de la commande balance',
    usage: '+balance',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `balance` en développement.', 'balance �� - Haruka Protect ⚡')] 
        });
    }
};