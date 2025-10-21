const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'role',
    description: 'Description de la commande role',
    usage: '+role',
    category: 'moderation',

    async execute(message, args, client) {
        await message.reply({ 
            embeds: [HarukaEmbeds.info('Commande `role` en développement.', 'role �� - Haruka Protect ⚡')] 
        });
    }
};