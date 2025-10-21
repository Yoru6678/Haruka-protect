const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'tictactoe',
    description: 'Description de la commande tictactoe',
    usage: '+tictactoe',
    category: 'fun',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `tictactoe` en développement.', 'tictactoe 🔧 - Haruka Protect ⚡')] 
        });
    }
};