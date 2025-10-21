const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ticketstats',
    description: 'Description de la commande ticketstats',
    usage: '+ticketstats',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ticketstats` en développement.', 'ticketstats �� - Haruka Protect ⚡')] 
        });
    }
};