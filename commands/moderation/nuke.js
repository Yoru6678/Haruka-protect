const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'nuke',
    description: 'Description de la commande nuke',
    usage: '+nuke',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `nuke` en développement.', 'nuke 🔧 - Haruka Protect ⚡')] 
        });
    }
};