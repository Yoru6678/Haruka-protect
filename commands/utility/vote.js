const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'vote',
    description: 'Description de la commande vote',
    usage: '+vote',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `vote` en développement.', 'vote 🔧 - Haruka Protect ⚡')] 
        });
    }
};