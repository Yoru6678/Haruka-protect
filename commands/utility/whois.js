const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'whois',
    description: 'Description de la commande whois',
    usage: '+whois',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `whois` en développement.', 'whois 🔧 - Haruka Protect ⚡')] 
        });
    }
};