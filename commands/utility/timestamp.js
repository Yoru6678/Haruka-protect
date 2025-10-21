const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'timestamp',
    description: 'Description de la commande timestamp',
    usage: '+timestamp',
    category: 'utility',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `timestamp` en développement.', 'timestamp �� - Haruka Protect ⚡')] 
        });
    }
};