const HarukaEmbeds = require('../utils/embeds');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: '❌ Une erreur est survenue lors de l\'exécution de cette commande!', 
                ephemeral: true 
            });
        }
    }
};