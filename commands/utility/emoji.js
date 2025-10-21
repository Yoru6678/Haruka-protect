const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'emoji',
    description: 'Description de la commande emoji',
    usage: '+emoji',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `emoji` en développement.', 'emoji �� - Haruka Protect ⚡')] 
        });
    }
};