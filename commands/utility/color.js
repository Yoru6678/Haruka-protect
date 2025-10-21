const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'color',
    description: 'Description de la commande color',
    usage: '+color',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `color` en développement.', 'color �� - Haruka Protect ⚡')] 
        });
    }
};