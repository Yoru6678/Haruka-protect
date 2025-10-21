const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'coinflip',
    description: 'Description de la commande coinflip',
    usage: '+coinflip',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `coinflip` en développement.', 'coinflip �� - Haruka Protect ⚡')] 
        });
    }
};