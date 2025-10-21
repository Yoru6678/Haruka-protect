const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'lockticket',
    description: 'Description de la commande lockticket',
    usage: '+lockticket',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `lockticket` en développement.', 'lockticket 🔧 - Haruka Protect ⚡')] 
        });
    }
};