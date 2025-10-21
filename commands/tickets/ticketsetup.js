const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'ticketsetup',
    description: 'Description de la commande ticketsetup',
    usage: '+ticketsetup',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `ticketsetup` en développement.', 'ticketsetup �� - Haruka Protect ⚡')] 
        });
    }
};