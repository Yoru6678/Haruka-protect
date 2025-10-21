const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ticketpanel',
    description: 'Description de la commande ticketpanel',
    usage: '+ticketpanel',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ticketpanel` en développement.', 'ticketpanel 🔧 - Haruka Protect ⚡')] 
        });
    }
};