const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'reload',
    description: 'Description de la commande reload',
    usage: '+reload',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `reload` en développement.', 'reload �� - Haruka Protect ⚡')] 
        });
    }
};