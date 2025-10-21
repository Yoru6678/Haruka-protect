const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'reset',
    description: 'Description de la commande reset',
    usage: '+reset',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `reset` en développement.', 'reset 🔧 - Haruka Protect ⚡')] 
        });
    }
};