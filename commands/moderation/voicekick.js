const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'voicekick',
    description: 'Description de la commande voicekick',
    usage: '+voicekick',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `voicekick` en développement.', 'voicekick �� - Haruka Protect ⚡')] 
        });
    }
};