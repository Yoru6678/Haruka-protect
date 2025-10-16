const { Events } = require('discord.js');
const Logger = require('../utils/logger');

module.exports = {
    name: Events.InteractionCreate,
    async execute(client, interaction) {
        if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;
        
        try {
            // Gérer les interactions du panel de sécurité
            if (interaction.customId === 'config_menu') {
                await interaction.deferUpdate();
                return;
            }
            
            // Logger l'interaction
            Logger.log('INTERACTION', interaction.user.tag, interaction.guild?.name || 'DM', 
                      `Type: ${interaction.type}, CustomId: ${interaction.customId}`);
                      
        } catch (error) {
            console.error('Erreur interaction:', error);
            Logger.error(error, 'Interaction Create');
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ 
                    content: '❌ Une erreur est survenue avec cette interaction.', 
                    ephemeral: true 
                });
            } else {
                await interaction.reply({ 
                    content: '❌ Une erreur est survenue avec cette interaction.', 
                    ephemeral: true 
                });
            }
        }
    }
};