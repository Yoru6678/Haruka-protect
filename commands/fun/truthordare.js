const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'truthordare',
    description: 'Description de la commande truthordare',
    usage: '+truthordare',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `truthordare` en développement.', 'truthordare �� - Haruka Protect ⚡')] 
        });
    }
};