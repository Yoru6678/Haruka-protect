const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'roulette',
    description: 'Description de la commande roulette',
    usage: '+roulette',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `roulette` en développement.', 'roulette �� - Haruka Protect ⚡')] 
        });
    }
};