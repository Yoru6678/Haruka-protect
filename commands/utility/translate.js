const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'translate',
    description: 'Description de la commande translate',
    usage: '+translate',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `translate` en développement.', 'translate �� - Haruka Protect ⚡')] 
        });
    }
};