const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'id',
    description: 'Description de la commande id',
    usage: '+id',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `id` en développement.', 'id �� - Haruka Protect ⚡')] 
        });
    }
};