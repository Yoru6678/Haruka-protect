const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'remind',
    description: 'Description de la commande remind',
    usage: '+remind',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `remind` en développement.', 'remind 🔧 - Haruka Protect ⚡')] 
        });
    }
};