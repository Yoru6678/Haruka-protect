const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setlevelchannel',
    description: 'Description de la commande setlevelchannel',
    usage: '+setlevelchannel',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setlevelchannel` en développement.', 'setlevelchannel �� - Haruka Protect ⚡')] 
        });
    }
};