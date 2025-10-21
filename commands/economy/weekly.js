const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'weekly',
    description: 'Description de la commande weekly',
    usage: '+weekly',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `weekly` en développement.', 'weekly �� - Haruka Protect ⚡')] 
        });
    }
};