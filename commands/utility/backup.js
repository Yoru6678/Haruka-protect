const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'backup',
    description: 'Description de la commande backup',
    usage: '+backup',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `backup` en développement.', 'backup 🔧 - Haruka Protect ⚡')] 
        });
    }
};