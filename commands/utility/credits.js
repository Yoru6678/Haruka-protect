const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'credits',
    description: 'Description de la commande credits',
    usage: '+credits',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `credits` en développement.', 'credits �� - Haruka Protect ⚡')] 
        });
    }
};