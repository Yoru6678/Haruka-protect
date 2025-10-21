const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'covid',
    description: 'Description de la commande covid',
    usage: '+covid',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `covid` en développement.', 'covid 🔧 - Haruka Protect ⚡')] 
        });
    }
};