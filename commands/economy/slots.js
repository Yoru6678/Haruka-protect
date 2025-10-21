const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'slots',
    description: 'Description de la commande slots',
    usage: '+slots',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `slots` en développement.', 'slots �� - Haruka Protect ⚡')] 
        });
    }
};