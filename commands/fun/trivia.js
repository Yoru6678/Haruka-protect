const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'trivia',
    description: 'Description de la commande trivia',
    usage: '+trivia',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `trivia` en développement.', 'trivia 🔧 - Haruka Protect ⚡')] 
        });
    }
};