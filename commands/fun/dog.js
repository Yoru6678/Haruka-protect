const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'dog',
    description: 'Description de la commande dog',
    usage: '+dog',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `dog` en développement.', 'dog �� - Haruka Protect ⚡')] 
        });
    }
};