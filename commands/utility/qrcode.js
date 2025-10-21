const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'qrcode',
    description: 'Description de la commande qrcode',
    usage: '+qrcode',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `qrcode` en développement.', 'qrcode �� - Haruka Protect ⚡')] 
        });
    }
};