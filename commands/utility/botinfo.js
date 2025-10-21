const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'botinfo',
    description: 'Description de la commande botinfo',
    usage: '+botinfo',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `botinfo` en développement.', 'botinfo �� - Haruka Protect ⚡')] 
        });
    }
};