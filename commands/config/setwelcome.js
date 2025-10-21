const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'setwelcome',
    description: 'Description de la commande setwelcome',
    usage: '+setwelcome',
    category: 'config',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `setwelcome` en développement.', 'setwelcome �� - Haruka Protect ⚡')] 
        });
    }
};