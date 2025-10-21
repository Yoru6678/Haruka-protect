const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'logchannel',
    description: 'Description de la commande logchannel',
    usage: '+logchannel',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `logchannel` en développement.', 'logchannel 🔧 - Haruka Protect ⚡')] 
        });
    }
};