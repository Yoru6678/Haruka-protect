const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'cat',
    description: 'Description de la commande cat',
    usage: '+cat',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `cat` en développement.', 'cat 🔧 - Haruka Protect ⚡')] 
        });
    }
};