const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setautorole',
    description: 'Description de la commande setautorole',
    usage: '+setautorole',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setautorole` en développement.', 'setautorole 🔧 - Haruka Protect ⚡')] 
        });
    }
};