const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'afk',
    description: 'Description de la commande afk',
    usage: '+afk',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `afk` en développement.', 'afk �� - Haruka Protect ⚡')] 
        });
    }
};