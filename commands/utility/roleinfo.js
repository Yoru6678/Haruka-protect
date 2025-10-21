const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'roleinfo',
    description: 'Description de la commande roleinfo',
    usage: '+roleinfo',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `roleinfo` en développement.', 'roleinfo �� - Haruka Protect ⚡')] 
        });
    }
};