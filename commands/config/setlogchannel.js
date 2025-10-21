const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setlogchannel',
    description: 'Description de la commande setlogchannel',
    usage: '+setlogchannel',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setlogchannel` en développement.', 'setlogchannel �� - Haruka Protect ⚡')] 
        });
    }
};