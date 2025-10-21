const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'clear',
    description: 'Supprimer des messages',
    usage: '+clear [nombre]',
    permissions: ['ManageMessages'],
    category: 'moderation',

    async execute(message, args, client) {
        const amount = parseInt(args[0]) || 10;
        
        if (amount < 1 || amount > 100) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez spécifier un nombre entre 1 et 100.')] 
            });
        }

        try {
            const deleted = await message.channel.bulkDelete(amount, true);
            const reply = await message.reply({ 
                embeds: [HarukaEmbeds.success(`${deleted.size} messages ont été supprimés.`)] 
            });
            
            setTimeout(() => reply.delete(), 5000);
        } catch (error) {
            await message.reply({ 
                embeds: [HarukaEmbeds.error(`Je ne peux pas supprimer ces messages.')] 
            });
        }
    }
};