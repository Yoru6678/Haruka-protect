const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'leaderboard',
    description: 'Description de la commande leaderboard',
    usage: '+leaderboard',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `leaderboard` en développement.', 'leaderboard 🔧 - Haruka Protect ⚡')] 
        });
    }
};