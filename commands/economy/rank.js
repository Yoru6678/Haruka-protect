const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'rank',
    description: 'Description de la commande rank',
    usage: '+rank',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `rank` en développement.', 'rank �� - Haruka Protect ⚡')] 
        });
    }
};