const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'test',
    description: 'Description de la commande test',
    usage: '+test',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `test` en développement.', 'test �� - Haruka Protect ⚡')] 
        });
    }
};