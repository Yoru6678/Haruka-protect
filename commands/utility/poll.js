const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'poll',
    description: 'Description de la commande poll',
    usage: '+poll',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `poll` en développement.', 'poll 🔧 - Haruka Protect ⚡')] 
        });
    }
};