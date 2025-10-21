const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'reverse',
    description: 'Description de la commande reverse',
    usage: '+reverse',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `reverse` en développement.', 'reverse �� - Haruka Protect ⚡')] 
        });
    }
};