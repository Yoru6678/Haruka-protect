const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'version',
    description: 'Description de la commande version',
    usage: '+version',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `version` en développement.', 'version 🔧 - Haruka Protect ⚡')] 
        });
    }
};