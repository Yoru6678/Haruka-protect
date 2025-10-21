const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'supportrole',
    description: 'Description de la commande supportrole',
    usage: '+supportrole',
    category: 'tickets',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `supportrole` en développement.', 'supportrole �� - Haruka Protect ⚡')] 
        });
    }
};