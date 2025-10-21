const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'pay',
    description: 'Description de la commande pay',
    usage: '+pay',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `pay` en développement.', 'pay 🔧 - Haruka Protect ⚡')] 
        });
    }
};