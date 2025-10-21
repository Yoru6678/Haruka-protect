const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'cases',
    description: 'Description de la commande cases',
    usage: '+cases',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `cases` en développement.', 'cases �� - Haruka Protect ⚡')] 
        });
    }
};