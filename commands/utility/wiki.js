const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'wiki',
    description: 'Description de la commande wiki',
    usage: '+wiki',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `wiki` en développement.', 'wiki �� - Haruka Protect ⚡')] 
        });
    }
};