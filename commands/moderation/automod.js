const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'automod',
    description: 'Description de la commande automod',
    usage: '+automod',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `automod` en développement.', 'automod �� - Haruka Protect ⚡')] 
        });
    }
};