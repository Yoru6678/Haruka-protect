const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'join',
    description: 'Description de la commande join',
    usage: '+join',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `join` en développement.', 'join �� - Haruka Protect ⚡')] 
        });
    }
};