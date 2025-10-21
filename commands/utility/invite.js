const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'invite',
    description: 'Description de la commande invite',
    usage: '+invite',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `invite` en développement.', 'invite 🔧 - Haruka Protect ⚡')] 
        });
    }
};