const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setmodrole',
    description: 'Description de la commande setmodrole',
    usage: '+setmodrole',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setmodrole` en développement.', 'setmodrole �� - Haruka Protect ⚡')] 
        });
    }
};