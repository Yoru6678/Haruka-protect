const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'eval',
    description: 'Description de la commande eval',
    usage: '+eval',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `eval` en développement.', 'eval 🔧 - Haruka Protect ⚡')] 
        });
    }
};