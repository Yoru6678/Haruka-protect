const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'uptime',
    description: 'Description de la commande uptime',
    usage: '+uptime',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `uptime` en développement.', 'uptime 🔧 - Haruka Protect ⚡')] 
        });
    }
};