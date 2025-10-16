const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const ServerConfig = require("../utils/serverConfig");
const { isAuthorized } = require("../security");

module.exports = {
    name: "config",
    description: "Configurer le bot pour ce serveur",
    async execute(message, args) {
        if (!isAuthorized(message)) {
            return message.reply("❌ Vous n'avez pas la permission de configuréer le bot.");
        }
        
        const config = new ServerConfig(message.guild.id);
        
        if (!args[0]) {
            const serverConfig = await config.getAll();
            await config.setupDefaultConfig();
            
            const embed = new EmbedBuilder()
                .setTitle("⚙️ Configuration du Serveur")
                .setDescription("Paramètres actuels de Haruka Protect")
                .setColor("#36adfa")
                .addFields(
                    { 
                        name: "🔧 Paramètres Généraux", 
                        value: `Prefix: `${serverConfig.prefix || '+'}`
Salon de logs: ${serverConfig.logChannel ? `<#${serverConfig.logChannel}>` : "Non configuréé"}`, 
                        inline: true 
                    },
                    { 
                        name: "🛡️ Auto-Modération", 
                        value: `Anti-Liens: ${serverConfig.autoMod?.antiLink ? '✅' : '❌'}
Anti-Spam: ${serverConfig.autoMod?.antiSpam ? '✅' : '❌'}`, 
                        inline: true 
                    }
                )
                .setFooter({ text: "Utilise +config <paramètre> <valeur> pour modifier" });
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('config_menu')
                        .setPlaceholder('Modifier un paramètre...')
                        .addOptions([
                            { label: 'Prefix', value: 'prefix', description: 'Changer le prefix du bot' },
                            { label: 'Salon de Logs', value: 'logChannel', description: 'Définir le salon des logs' }
                        ])
                );
            
            return message.channel.send({ embeds: [embed], components: [row] });
        }
        
        const [param, ...values] = args;
        const value = values.join(' ');
        
        switch (param.toLowerCase()) {
            case 'prefix':
                if (!value || value.length > 3) {
                    return message.reply("❌ Le prefix doit faire entre 1 et 3 caractères.");
                }
                await config.set('prefix', value);
                message.reply(`✅ Prefix mis à jour: `${value}``);
                break;
                
            case 'logs':
                const channel = message.mentions.channels.first();
                if (!channel) {
                    return message.reply("❌ Mentionne un salon valide.");
                }
                await config.set('logChannel', channel.id);
                message.reply(`✅ Salon de logs défini: ${channel}`);
                break;
                
            default:
                message.reply("❌ Paramètre inconnu. Paramètres disponibles: `prefix`, `logs`");
        }
    }
};