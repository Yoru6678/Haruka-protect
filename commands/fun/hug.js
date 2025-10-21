const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'hug',
    description: 'Description de la commande hug',
    usage: '+hug',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `hug` en développement.', 'hug �� - Haruka Protect ⚡')] 
        });
    }
};