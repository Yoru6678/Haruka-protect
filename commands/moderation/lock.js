const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'lock',
    description: 'Description de la commande lock',
    usage: '+lock',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `lock` en développement.', 'lock �� - Haruka Protect ⚡')] 
        });
    }
};