const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'seteconomy',
    description: 'Description de la commande seteconomy',
    usage: '+seteconomy',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `seteconomy` en développement.', 'seteconomy 🔧 - Haruka Protect ⚡')] 
        });
    }
};