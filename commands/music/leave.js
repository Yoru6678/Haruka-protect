const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'leave',
    description: 'Description de la commande leave',
    usage: '+leave',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `leave` en développement.', 'leave �� - Haruka Protect ⚡')] 
        });
    }
};