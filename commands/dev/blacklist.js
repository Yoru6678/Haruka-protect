const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'blacklist',
    description: 'Description de la commande blacklist',
    usage: '+blacklist',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `blacklist` en développement.', 'blacklist �� - Haruka Protect ⚡')] 
        });
    }
};