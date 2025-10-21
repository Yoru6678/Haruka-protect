const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'blackjack',
    description: 'Description de la commande blackjack',
    usage: '+blackjack',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `blackjack` en développement.', 'blackjack �� - Haruka Protect ⚡')] 
        });
    }
};