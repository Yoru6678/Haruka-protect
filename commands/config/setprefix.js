const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setprefix',
    description: 'Description de la commande setprefix',
    usage: '+setprefix',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setprefix` en développement.', 'setprefix �� - Haruka Protect ⚡')] 
        });
    }
};