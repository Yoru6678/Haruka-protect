const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'rename',
    description: 'Description de la commande rename',
    usage: '+rename',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `rename` en développement.', 'rename 🔧 - Haruka Protect ⚡')] 
        });
    }
};