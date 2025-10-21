
module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.config.bot.prefix)) return;
        
        const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command = client.commands.get(commandName);
        if (!command) return;
        
        try {
            // Vérification des permissions
            if (command.permissions) {
                const missingPerms = command.permissions.filter(perm => 
                    !message.member.permissions.has(perm)
                );
                if (missingPerms.length > 0) {
                    return message.reply({
                        embeds: [{
                            color: 0xff0000,
                            title: '❌ Permissions manquantes',
                            description: `Vous avez besoin des permissions: ${missingPerms.join(', ')}`
                        }]
                    });
                }
            }
            
            await command.execute(message, args, client);
        } catch (error) {
            console.error('Erreur commande:', error);
            await message.reply({
                embeds: [{
                    color: 0xff0000,
                    title: '❌ Erreur',
                    description: 'Une erreur est survenue lors de l\'exécution de cette commande.'
                }]
            });
        }
    }
};