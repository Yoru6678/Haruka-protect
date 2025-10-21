const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ship',
    description: 'Description de la commande ship',
    usage: '+ship',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ship` en développement.', 'ship �� - Haruka Protect ⚡')] 
        });
    }
};