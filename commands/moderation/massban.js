const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'massban',
    description: 'Description de la commande massban',
    usage: '+massban',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `massban` en développement.', 'massban �� - Haruka Protect ⚡')] 
        });
    }
};