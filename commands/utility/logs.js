const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'logs',
    description: 'Description de la commande logs',
    usage: '+logs',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `logs` en développement.', 'logs �� - Haruka Protect ⚡')] 
        });
    }
};