const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'rps',
    description: 'Description de la commande rps',
    usage: '+rps',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `rps` en développement.', 'rps �� - Haruka Protect ⚡')] 
        });
    }
};