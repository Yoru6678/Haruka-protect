const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'radio',
    description: 'Description de la commande radio',
    usage: '+radio',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `radio` en développement.', 'radio �� - Haruka Protect ⚡')] 
        });
    }
};