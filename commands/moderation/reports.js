const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'reports',
    description: 'Description de la commande reports',
    usage: '+reports',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `reports` en développement.', 'reports �� - Haruka Protect ⚡')] 
        });
    }
};