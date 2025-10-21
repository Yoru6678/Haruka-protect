const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ticketrole',
    description: 'Description de la commande ticketrole',
    usage: '+ticketrole',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ticketrole` en développement.', 'ticketrole �� - Haruka Protect ⚡')] 
        });
    }
};