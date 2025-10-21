const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'tempban',
    description: 'Description de la commande tempban',
    usage: '+tempban',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `tempban` en développement.', 'tempban 🔧 - Haruka Protect ⚡')] 
        });
    }
};