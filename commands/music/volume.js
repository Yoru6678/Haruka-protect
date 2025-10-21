const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'volume',
    description: 'Description de la commande volume',
    usage: '+volume',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `volume` en développement.', 'volume �� - Haruka Protect ⚡')] 
        });
    }
};