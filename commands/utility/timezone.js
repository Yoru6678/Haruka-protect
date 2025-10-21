const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'timezone',
    description: 'Description de la commande timezone',
    usage: '+timezone',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `timezone` en développement.', 'timezone �� - Haruka Protect ⚡')] 
        });
    }
};