const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'calc',
    description: 'Description de la commande calc',
    usage: '+calc',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `calc` en développement.', 'calc �� - Haruka Protect ⚡')] 
        });
    }
};