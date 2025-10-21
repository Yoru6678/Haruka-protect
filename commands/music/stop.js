const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'stop',
    description: 'Description de la commande stop',
    usage: '+stop',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `stop` en développement.', 'stop �� - Haruka Protect ⚡')] 
        });
    }
};