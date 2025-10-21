const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'spotify',
    description: 'Description de la commande spotify',
    usage: '+spotify',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `spotify` en développement.', 'spotify �� - Haruka Protect ⚡')] 
        });
    }
};