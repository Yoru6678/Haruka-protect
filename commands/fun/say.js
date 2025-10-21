const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'say',
    description: 'Description de la commande say',
    usage: '+say',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `say` en développement.', 'say �� - Haruka Protect ⚡')] 
        });
    }
};