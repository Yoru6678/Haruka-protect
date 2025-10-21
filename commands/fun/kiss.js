const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'kiss',
    description: 'Description de la commande kiss',
    usage: '+kiss',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `kiss` en développement.', 'kiss 🔧 - Haruka Protect ⚡')] 
        });
    }
};