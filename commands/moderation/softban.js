const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'softban',
    description: 'Description de la commande softban',
    usage: '+softban',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `softban` en développement.', 'softban �� - Haruka Protect ⚡')] 
        });
    }
};