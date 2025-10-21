const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche toutes les commandes disponibles',
    usage: '+help [commande]',
    aliases: ['h', 'aide', 'commands'],
    category: 'utility',

    async execute(message, args, client) {
        // Si une commande spécifique est demandée
        if (args[0]) {
            return this.showCommandHelp(message, args[0], client);
        }

        // Afficher le menu principal
        await this.showMainMenu(message, client);
    },

    async showMainMenu(message, client) {
        const categories = this.organizeCommands(client);
        const totalCommands = this.countImplementedCommands(categories);

        const embed = new EmbedBuilder()
            .setColor('#7289DA')
            .setAuthor({ 
                name: 'Haruka Protect ⚡ - Centre d\'Aide',
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription(
                '**Bienvenue dans le système d\'aide de Haruka Protect !**\n\n' +
                'Utilisez les boutons ci-dessous pour explorer les différentes catégories de commandes.\n' +
                `Total de **${totalCommands} commandes** disponibles et fonctionnelles.`
            )
            .addFields([
                {
                    name: '🛡️ Modération',
                    value: `\`${categories.moderation.implemented}\` commandes\nGestion et protection du serveur`,
                    inline: true
                },
                {
                    name: '🔧 Utilitaires',
                    value: `\`${categories.utility.implemented}\` commandes\nOutils pratiques et informations`,
                    inline: true
                },
                {
                    name: '🎫 Tickets',
                    value: `\`${categories.tickets.implemented}\` commandes\nSystème de support`,
                    inline: true
                },
                {
                    name: '🎉 Fun',
                    value: `\`${categories.fun.implemented}\` commandes\nJeux et divertissement`,
                    inline: true
                },
                {
                    name: '💰 Économie',
                    value: `\`${categories.economy.implemented}\` commandes\nSystème économique`,
                    inline: true
                },
                {
                    name: '🎵 Musique',
                    value: `\`${categories.music.implemented}\` commandes\nLecteur de musique`,
                    inline: true
                },
                {
                    name: '⚙️ Configuration',
                    value: `\`${categories.config.implemented}\` commandes\nParamètres du bot`,
                    inline: true
                },
                {
                    name: '👑 Développeur',
                    value: `\`${categories.dev.implemented}\` commandes\nCommandes de développement`,
                    inline: true
                }
            ])
            .setFooter({ 
                text: `Demandé par ${message.author.tag} • Préfixe: ${client.config.bot.prefix}`,
                iconURL: message.author.displayAvatarURL()
            })
            .setTimestamp();

        // Boutons de navigation
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('help_moderation')
                .setLabel('Modération')
                .setEmoji('🛡️')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_utility')
                .setLabel('Utilitaires')
                .setEmoji('🔧')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_tickets')
                .setLabel('Tickets')
                .setEmoji('🎫')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_fun')
                .setLabel('Fun')
                .setEmoji('🎉')
                .setStyle(ButtonStyle.Primary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('help_economy')
                .setLabel('Économie')
                .setEmoji('💰')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_music')
                .setLabel('Musique')
                .setEmoji('🎵')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_config')
                .setLabel('Configuration')
                .setEmoji('⚙️')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_dev')
                .setLabel('Dev')
                .setEmoji('👑')
                .setStyle(ButtonStyle.Danger)
        );

        const sentMessage = await message.reply({ 
            embeds: [embed], 
            components: [row1, row2]
        });

        // Créer le collecteur de boutons
        this.createButtonCollector(sentMessage, message.author.id, client, categories);
    },

    createButtonCollector(sentMessage, userId, client, categories) {
        const collector = sentMessage.createMessageComponentCollector({
            time: 300000 // 5 minutes
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== userId) {
                return interaction.reply({
                    content: '❌ Seul l\'auteur de la commande peut utiliser ces boutons.',
                    ephemeral: true
                });
            }

            const categoryMap = {
                'help_moderation': 'moderation',
                'help_utility': 'utility',
                'help_tickets': 'tickets',
                'help_fun': 'fun',
                'help_economy': 'economy',
                'help_music': 'music',
                'help_config': 'config',
                'help_dev': 'dev',
                'help_home': 'home'
            };

            const categoryName = categoryMap[interaction.customId];

            if (categoryName === 'home') {
                const embed = this.createMainEmbed(client, interaction.user, categories);
                const [row1, row2] = this.createMainButtons();
                await interaction.update({ embeds: [embed], components: [row1, row2] });
            } else {
                const [embed, row] = this.createCategoryEmbed(categoryName, categories, client);
                await interaction.update({ embeds: [embed], components: [row] });
            }
        });

        collector.on('end', () => {
            sentMessage.edit({ components: [] }).catch(() => {});
        });
    },

    createMainEmbed(client, user, categories) {
        const totalCommands = this.countImplementedCommands(categories);

        return new EmbedBuilder()
            .setColor('#7289DA')
            .setAuthor({ 
                name: 'Haruka Protect ⚡ - Centre d\'Aide',
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription(
                '**Bienvenue dans le système d\'aide de Haruka Protect !**\n\n' +
                'Utilisez les boutons ci-dessous pour explorer les différentes catégories de commandes.\n' +
                `Total de **${totalCommands} commandes** disponibles et fonctionnelles.`
            )
            .addFields([
                {
                    name: '🛡️ Modération',
                    value: `\`${categories.moderation.implemented}\` commandes\nGestion et protection du serveur`,
                    inline: true
                },
                {
                    name: '🔧 Utilitaires',
                    value: `\`${categories.utility.implemented}\` commandes\nOutils pratiques et informations`,
                    inline: true
                },
                {
                    name: '🎫 Tickets',
                    value: `\`${categories.tickets.implemented}\` commandes\nSystème de support`,
                    inline: true
                },
                {
                    name: '🎉 Fun',
                    value: `\`${categories.fun.implemented}\` commandes\nJeux et divertissement`,
                    inline: true
                },
                {
                    name: '💰 Économie',
                    value: `\`${categories.economy.implemented}\` commandes\nSystème économique`,
                    inline: true
                },
                {
                    name: '🎵 Musique',
                    value: `\`${categories.music.implemented}\` commandes\nLecteur de musique`,
                    inline: true
                },
                {
                    name: '⚙️ Configuration',
                    value: `\`${categories.config.implemented}\` commandes\nParamètres du bot`,
                    inline: true
                },
                {
                    name: '👑 Développeur',
                    value: `\`${categories.dev.implemented}\` commandes\nCommandes de développement`,
                    inline: true
                }
            ])
            .setFooter({ 
                text: `Demandé par ${user.tag} • Préfixe: ${client.config.bot.prefix}`,
                iconURL: user.displayAvatarURL()
            })
            .setTimestamp();
    },

    createMainButtons() {
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('help_moderation')
                .setLabel('Modération')
                .setEmoji('🛡️')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_utility')
                .setLabel('Utilitaires')
                .setEmoji('🔧')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_tickets')
                .setLabel('Tickets')
                .setEmoji('🎫')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('help_fun')
                .setLabel('Fun')
                .setEmoji('🎉')
                .setStyle(ButtonStyle.Primary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('help_economy')
                .setLabel('Économie')
                .setEmoji('💰')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_music')
                .setLabel('Musique')
                .setEmoji('🎵')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_config')
                .setLabel('Configuration')
                .setEmoji('⚙️')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('help_dev')
                .setLabel('Dev')
                .setEmoji('👑')
                .setStyle(ButtonStyle.Danger)
        );

        return [row1, row2];
    },

    createCategoryEmbed(categoryName, categories, client) {
        const category = categories[categoryName];
        const categoryInfo = this.getCategoryInfo(categoryName);

        const commandsList = category.commands
            .filter(cmd => cmd.implemented)
            .map(cmd => `\`${client.config.bot.prefix}${cmd.name}\` - ${cmd.description || 'Aucune description'}`)
            .join('\n') || 'Aucune commande disponible dans cette catégorie.';

        const embed = new EmbedBuilder()
            .setColor(categoryInfo.color)
            .setAuthor({ 
                name: `${categoryInfo.emoji} ${categoryInfo.name} - Haruka Protect ⚡`,
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription(
                `**${categoryInfo.description}**\n\n` +
                `${category.implemented} commande(s) disponible(s)\n\n` +
                commandsList
            )
            .setFooter({ 
                text: `Utilisez ${client.config.bot.prefix}help <commande> pour plus d'informations`,
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('help_home')
                .setLabel('Retour au menu')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Secondary)
        );

        return [embed, row];
    },

    getCategoryInfo(category) {
        const info = {
            moderation: {
                name: 'Modération',
                emoji: '🛡️',
                color: '#ED4245',
                description: 'Commandes de gestion et de protection du serveur'
            },
            utility: {
                name: 'Utilitaires',
                emoji: '🔧',
                color: '#5865F2',
                description: 'Outils pratiques et informations utiles'
            },
            tickets: {
                name: 'Tickets',
                emoji: '🎫',
                color: '#FEE75C',
                description: 'Système de support et de tickets'
            },
            fun: {
                name: 'Fun',
                emoji: '🎉',
                color: '#EB459E',
                description: 'Jeux et commandes de divertissement'
            },
            economy: {
                name: 'Économie',
                emoji: '💰',
                color: '#57F287',
                description: 'Système économique du serveur'
            },
            music: {
                name: 'Musique',
                emoji: '🎵',
                color: '#9B59B6',
                description: 'Lecteur de musique et commandes audio'
            },
            config: {
                name: 'Configuration',
                emoji: '⚙️',
                color: '#95A5A6',
                description: 'Paramètres et configuration du bot'
            },
            dev: {
                name: 'Développeur',
                emoji: '👑',
                color: '#F1C40F',
                description: 'Commandes réservées aux développeurs'
            }
        };

        return info[category] || info.utility;
    },

    organizeCommands(client) {
        const categories = {
            moderation: { commands: [], implemented: 0 },
            utility: { commands: [], implemented: 0 },
            tickets: { commands: [], implemented: 0 },
            fun: { commands: [], implemented: 0 },
            economy: { commands: [], implemented: 0 },
            music: { commands: [], implemented: 0 },
            config: { commands: [], implemented: 0 },
            dev: { commands: [], implemented: 0 }
        };

        // Commandes non implémentées (retournent "en développement")
        const notImplemented = [
            'youtube', 'truthordare', 'trivia', 'wiki', 'tictactoe', 'whois', 'hug',
            'slap', 'weather', 'gif', 'ship', 'vote', 'fox', 'say', 'quote', 'uptime',
            'emojitext', 'rps', 'dog', 'translate', 'roulette', 'pokemon', 'dice',
            'timezone', 'coinflip', 'reverse', 'timestamp', 'meme', 'cat', 'joke',
            'kiss', 'ascii', 'randomcolor', 'nuke', 'unlock', 'modstats', 'tempban',
            'massban', 'softban', 'lockdown', 'slowmode', 'lock', 'role', 'reports',
            'history', 'automod', 'cases', 'antiraid', 'lyrics', 'join', 'leave',
            'loop', 'nowplaying', 'pause', 'play', 'queue', 'radio', 'resume',
            'shuffle', 'skip', 'stop', 'volume', 'autoplay'
        ];

        client.commands.forEach(command => {
            const category = command.category || 'utility';
            const isImplemented = !notImplemented.includes(command.name);
            
            if (categories[category]) {
                categories[category].commands.push({
                    ...command,
                    implemented: isImplemented
                });
                if (isImplemented) {
                    categories[category].implemented++;
                }
            }
        });

        return categories;
    },

    countImplementedCommands(categories) {
        return Object.values(categories).reduce((total, cat) => total + cat.implemented, 0);
    },

    async showCommandHelp(message, commandName, client) {
        const command = client.commands.get(commandName.toLowerCase());
        if (!command) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ED4245')
                    .setTitle('❌ Commande introuvable')
                    .setDescription(`La commande \`${commandName}\` n'existe pas.`)
                    .setFooter({ text: `Utilisez ${client.config.bot.prefix}help pour voir toutes les commandes` })
                ]
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#7289DA')
            .setAuthor({ 
                name: `Aide: ${command.name}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription(command.description || 'Aucune description disponible')
            .addFields([
                {
                    name: '📝 Utilisation',
                    value: `\`${command.usage || `${client.config.bot.prefix}${command.name}`}\``,
                    inline: false
                },
                {
                    name: '📂 Catégorie',
                    value: `\`${command.category || 'Non classée'}\``,
                    inline: true
                },
                {
                    name: '🔐 Permissions',
                    value: command.permissions ? command.permissions.map(p => `\`${p}\``).join(', ') : '`Aucune`',
                    inline: true
                }
            ])
            .setFooter({ 
                text: 'Syntaxe: <obligatoire> [optionnel]',
                iconURL: message.author.displayAvatarURL()
            })
            .setTimestamp();

        if (command.aliases && command.aliases.length > 0) {
            embed.addFields({
                name: '🔀 Alias',
                value: command.aliases.map(a => `\`${a}\``).join(', '),
                inline: false
            });
        }

        await message.reply({ embeds: [embed] });
    }
};
