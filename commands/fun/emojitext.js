const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'emojitext',
    description: 'Description de la commande emojitext',
    usage: '+emojitext',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `emojitext` en développement.', 'emojitext 🔧 - Haruka Protect ⚡')] 
        });
    }
};