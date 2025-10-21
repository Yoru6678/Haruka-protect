const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'resume',
    description: 'Description de la commande resume',
    usage: '+resume',
    category: 'music',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `resume` en développement.', 'resume �� - Haruka Protect ⚡')] 
        });
    }
};