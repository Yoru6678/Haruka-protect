const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'config',
    description: 'Description de la commande config',
    usage: '+config',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `config` en développement.', 'config �� - Haruka Protect ⚡')] 
        });
    }
};