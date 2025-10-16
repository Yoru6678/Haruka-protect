const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ServerConfig = require("../utils/serverConfig");

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes disponibles",
    async execute(message, args) {
        const config = new ServerConfig(message.guild.id);
        const serverConfig = await config.getAll();
        
        const embed = new EmbedBuilder()
            .setTitle("🛡️ Haruka Protect - Panel d'Aide")
            .setDescription("Système complet de protection et modération")
            .setColor("#36adfa")
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                {
                    name: "🔧 Modération Basique",
                    value: "\`+mute\` \`+unmute\` \`+warn\` \`+warnlist\` \`+lock\` \`+unlock\`",
                    inline: false
                },
                {
                    name: "🛡️ Système Anti-Raid",
                    value: "\`+secur\` \`+antiraid\` \`+antilink\` \`+antibot\` \`+antiban\` \`+sanction\`",
                    inline: false
                },
                {
                    name: "🎫 Tickets & Utilitaires",
                    value: "\`+ticket\` \`+dmdban\` \`+config\` \`+ping\` \`+help\`",
                    inline: false
                },
                {
                    name: "⚙️ Configuration",
                    value: "Utilise \`+config\` pour configurer le bot\nUtilise \`+bypass\` pour voir les permissions",
                    inline: false
                }
            )
            .setFooter({ 
                text: `Haruka Protect • Prefix: ${serverConfig.prefix || '+'} • ${message.guild.name}`, 
                iconURL: message.guild.iconURL() 
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('📖 Commandes Avancées')
                    .setCustomId('advanced_help')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('🛡️ Protection')
                    .setCustomId('protection_help')
                    .setStyle(ButtonStyle.Success)
            );

        const msg = await message.channel.send({ embeds: [embed], components: [row] });
        
        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 });
        
        collector.on('collect', async i => {
            if (i.customId === 'advanced_help') {
                const advancedEmbed = new EmbedBuilder()
                    .setTitle("🛡️ Commandes Avancées - Anti-Raid")
                    .setColor("#ff6b6b")
                    .setDescription("Commandes de sécurité avancée (Owner uniquement)")
                    .addFields(
                        { name: "Anti-Channel", value: "\`+antichannel on/off\`", inline: true },
                        { name: "Anti-Rôle", value: "\`+antirôle on/off\`", inline: true },
                        { name: "Anti-Webhook", value: "\`+antiwebhook on/off\`", inline: true },
                        { name: "Anti-Update", value: "\`+antiupdate on/off\`", inline: true },
                        { name: "Anti-Down", value: "\`+antidown on/off\`", inline: true },
                        { name: "Anti-Everyone", value: "\`+antieveryone on/off\`", inline: true },
                        { name: "Server Lock", value: "\`+server lock/unlock\`", inline: true }
                    );
                
                await i.update({ embeds: [advancedEmbed], components: [] });
            }
            
            if (i.customId === 'protection_help') {
                const protectionEmbed = new EmbedBuilder()
                    .setTitle("⚔️ Système de Protection")
                    .setColor("#4ecdc4")
                    .setDescription("Configuration de la sécurité automatique")
                    .addFields(
                        { name: "Panel Principal", value: "\`+secur\` - Panel complet", inline: true },
                        { name: "Sanctions", value: "\`+sanction\` - Configurer les punitions", inline: true },
                        { name: "Bypass", value: "\`+bypass\` - Voir qui peut bypass", inline: true }
                    )
                    .setFooter({ text: "Utilise +secur pour le panel interactif complet" });
                
                await i.update({ embeds: [protectionEmbed], components: [] });
            }
        });
        
        collector.on('end', () => {
            msg.edit({ components: [] }).catch(() => {});
        });
    }
};