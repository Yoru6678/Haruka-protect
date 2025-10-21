const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'systeminfo',
    description: 'Description de la commande systeminfo',
    usage: '+systeminfo',
    category: 'dev',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `systeminfo` en développement.', 'systeminfo �� - Haruka Protect ⚡')] 
        });
    }
};