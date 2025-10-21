const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'meme',
    description: 'Description de la commande meme',
    usage: '+meme',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `meme` en développement.', 'meme 🔧 - Haruka Protect ⚡')] 
        });
    }
};