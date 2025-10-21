const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'pause',
    description: 'Description de la commande pause',
    usage: '+pause',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `pause` en développement.', 'pause �� - Haruka Protect ⚡')] 
        });
    }
};