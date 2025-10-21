const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'deposit',
    description: 'Description de la commande deposit',
    usage: '+deposit',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `deposit` en développement.', 'deposit 🔧 - Haruka Protect ⚡')] 
        });
    }
};