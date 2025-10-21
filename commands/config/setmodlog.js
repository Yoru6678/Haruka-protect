const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setmodlog',
    description: 'Description de la commande setmodlog',
    usage: '+setmodlog',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setmodlog` en développement.', 'setmodlog �� - Haruka Protect ⚡')] 
        });
    }
};