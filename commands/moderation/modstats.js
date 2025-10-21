const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'modstats',
    description: 'Description de la commande modstats',
    usage: '+modstats',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `modstats` en développement.', 'modstats 🔧 - Haruka Protect ⚡')] 
        });
    }
};