const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'purge',
    description: 'Description de la commande purge',
    usage: '+purge',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `purge` en développement.', 'purge 🔧 - Haruka Protect ⚡')] 
        });
    }
};