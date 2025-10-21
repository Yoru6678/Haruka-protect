const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'loop',
    description: 'Description de la commande loop',
    usage: '+loop',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `loop` en développement.', 'loop �� - Haruka Protect ⚡')] 
        });
    }
};