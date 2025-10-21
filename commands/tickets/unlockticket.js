const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'unlockticket',
    description: 'Description de la commande unlockticket',
    usage: '+unlockticket',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `unlockticket` en développement.', 'unlockticket �� - Haruka Protect ⚡')] 
        });
    }
};