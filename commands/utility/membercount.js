const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'membercount',
    description: 'Description de la commande membercount',
    usage: '+membercount',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `membercount` en développement.', 'membercount 🔧 - Haruka Protect ⚡')] 
        });
    }
};