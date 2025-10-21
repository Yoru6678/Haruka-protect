const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'update',
    description: 'Description de la commande update',
    usage: '+update',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `update` en développement.', 'update 🔧 - Haruka Protect ⚡')] 
        });
    }
};