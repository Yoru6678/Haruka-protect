const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setleave',
    description: 'Description de la commande setleave',
    usage: '+setleave',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setleave` en développement.', 'setleave �� - Haruka Protect ⚡')] 
        });
    }
};