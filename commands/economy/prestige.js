const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'prestige',
    description: 'Description de la commande prestige',
    usage: '+prestige',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `prestige` en développement.', 'prestige �� - Haruka Protect ⚡')] 
        });
    }
};