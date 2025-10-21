const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'announce',
    description: 'Description de la commande announce',
    usage: '+announce',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `announce` en développement.', 'announce �� - Haruka Protect ⚡')] 
        });
    }
};