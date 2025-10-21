const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'unlock',
    description: 'Description de la commande unlock',
    usage: '+unlock',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `unlock` en développement.', 'unlock 🔧 - Haruka Protect ⚡')] 
        });
    }
};