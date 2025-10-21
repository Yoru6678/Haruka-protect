const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setantiraid',
    description: 'Description de la commande setantiraid',
    usage: '+setantiraid',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setantiraid` en développement.', 'setantiraid 🔧 - Haruka Protect ⚡')] 
        });
    }
};