const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'work',
    description: 'Description de la commande work',
    usage: '+work',
    category: 'economy',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `work` en développement.', 'work 🔧 - Haruka Protect ⚡')] 
        });
    }
};