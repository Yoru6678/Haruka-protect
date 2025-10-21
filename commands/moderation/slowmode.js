const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'slowmode',
    description: 'Description de la commande slowmode',
    usage: '+slowmode',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `slowmode` en développement.', 'slowmode 🔧 - Haruka Protect ⚡')] 
        });
    }
};