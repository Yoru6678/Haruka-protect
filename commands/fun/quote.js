const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'quote',
    description: 'Description de la commande quote',
    usage: '+quote',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `quote` en développement.', 'quote 🔧 - Haruka Protect ⚡')] 
        });
    }
};