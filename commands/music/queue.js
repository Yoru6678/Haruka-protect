const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'queue',
    description: 'Description de la commande queue',
    usage: '+queue',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `queue` en développement.', 'queue �� - Haruka Protect ⚡')] 
        });
    }
};