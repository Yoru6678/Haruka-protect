const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'randomcolor',
    description: 'Description de la commande randomcolor',
    usage: '+randomcolor',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `randomcolor` en développement.', 'randomcolor �� - Haruka Protect ⚡')] 
        });
    }
};