const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'antiraid',
    description: 'Description de la commande antiraid',
    usage: '+antiraid',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `antiraid` en développement.', 'antiraid �� - Haruka Protect ⚡')] 
        });
    }
};