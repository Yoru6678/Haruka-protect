const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'owner',
    description: 'Description de la commande owner',
    usage: '+owner',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `owner` en développement.', 'owner 🔧 - Haruka Protect ⚡')] 
        });
    }
};