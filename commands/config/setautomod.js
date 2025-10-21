const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setautomod',
    description: 'Description de la commande setautomod',
    usage: '+setautomod',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setautomod` en développement.', 'setautomod 🔧 - Haruka Protect ⚡')] 
        });
    }
};