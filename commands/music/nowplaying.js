const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'nowplaying',
    description: 'Description de la commande nowplaying',
    usage: '+nowplaying',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `nowplaying` en développement.', 'nowplaying �� - Haruka Protect ⚡')] 
        });
    }
};