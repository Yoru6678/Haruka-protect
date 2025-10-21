const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'help',
    description: 'Affiche toutes les commandes disponibles',
    usage: '+help [commande]',
    aliases: ['h'],
    category: 'utility',

    async execute(message, args, client) {
        if (args[0]) {
            return this.showCommandHelp(message, args[0], client);
        }

        const categories = this.organizeCommands(client);
        const totalCommands = this.countTotalCommands(categories);

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle('🎯 Centre d\'Aide - Haruka Protect ⚡')
            .setDescription(\`**${totalCommands} commandes disponibles**\nUtilise le menu déroulant pour explorer ou \`${client.config.bot.prefix}help [commande]\` pour plus d'infos\`)
            .addFields(
                { name: '🛡️ Modération', value: \`\`${categories.moderation.length}\`\` commandes\`, inline: true },
                { name: '🔧 Utilitaires', value: \`\`${categories.utility.length}\`\` commandes\`, inline: true },
                { name: '🎫 Tickets', value: \`\`${categories.tickets.length}\`\` commandes\`, inline: true },
                { name: '🎮 Fun', value: \`\`${categories.fun.length}\`\` commandes\`, inline: true },
                { name: '💰 Économie', value: \`\`${categories.economy.length}\`\` commandes\`, inline: true },
                { name: '🎵 Musique', value: \`\`${categories.music.length}\`\` commandes\`, inline: true }
            )
            .setFooter({ text: \`${client.config.bot.footer} • Version ${client.config.bot.version}\` });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('help_category')
            .setPlaceholder('Choisis une catégorie...')
            .addOptions([
                { label: '🛡️ Modération', value: 'moderation', description: \`${categories.moderation.length} commandes\` },
                { label: '🔧 Utilitaires', value: 'utility', description: \`${categories.utility.length} commandes\` },
                { label: '🎫 Tickets', value: 'tickets', description: \`${categories.tickets.length} commandes\` },
                { label: '🎮 Fun', value: 'fun', description: \`${categories.fun.length} commandes\` },
                { label: '💰 Économie', value: 'economy', description: \`${categories.economy.length} commandes\` },
                { label: '🎵 Musique', value: 'music', description: \`${categories.music.length} commandes\` }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const sentMessage = await message.reply({ 
            embeds: [embed], 
            components: [row] 
        });

        this.createSelectCollector(sentMessage, categories, message.author.id, client);
    },

    organizeCommands(client) {
        const categories = {
            moderation: [],
            utility: [],
            tickets: [],
            fun: [],
            economy: [],
            music: [],
            config: []
        };

        client.commands.forEach(command => {
            if (categories[command.category]) {
                categories[command.category].push(command);
            }
        });

        return categories;
    },

    countTotalCommands(categories) {
        return Object.values(categories).reduce((total, category) => total + category.length, 0);
    },

    createSelectCollector(message, categories, userId, client) {
        const collector = message.createMessageComponentCollector({
            time: 60000
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== userId) {
                return interaction.reply({ 
                    embeds: [HarukaEmbeds.error('Seul l\'auteur de la commande peut utiliser ce menu.')],
                    ephemeral: true 
                });
            }

            const category = interaction.values[0];
            await this.showCategory(interaction, categories, category, client);
        });

        collector.on('end', () => {
            message.edit({ components: [] }).catch(() => {});
        });
    },

    async showCategory(interaction, categories, categoryName, client) {
        const category = categories[categoryName];
        if (!category) return;

        const commandsList = category.map(cmd => 
            \`• \`${cmd.name}\` - ${cmd.description || 'Aucune description'}\`
        ).join('\n');

        const categoryEmbed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`${this.getCategoryEmoji(categoryName)} Commandes ${categoryName} - Haruka Protect ⚡\`)
            .setDescription(commandsList)
            .setFooter({ text: \`${category.length} commandes • ${client.config.bot.footer}\` });

        await interaction.update({ embeds: [categoryEmbed] });
    },

    getCategoryEmoji(category) {
        const emojis = {
            moderation: '🛡️',
            utility: '🔧',
            tickets: '🎫',
            fun: '🎮',
            economy: '💰',
            music: '🎵',
            config: '⚙️'
        };
        return emojis[category] || '🔹';
    },

    async showCommandHelp(message, commandName, client) {
        const command = client.commands.get(commandName.toLowerCase());
        if (!command) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error(\`La commande \`${commandName}\` n'existe pas.\`)] 
            });
        }

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`📖 Aide: ${command.name} - Haruka Protect ⚡\`)
            .setDescription(command.description || 'Aucune description disponible')
            .addFields(
                { name: 'Utilisation', value: \`\`${command.usage || \`${client.config.bot.prefix}${command.name}\`}\`\`, inline: true },
                { name: 'Catégorie', value: \`\`${command.category || 'Non classée'}\`\`, inline: true },
                { name: 'Permissions', value: command.permissions ? command.permissions.map(p => \`\`${p}\`\`).join(', ') : 'Aucune', inline: true },
                { name: 'Alias', value: command.aliases ? command.aliases.map(a => \`\`${a}\`\`).join(', ') : 'Aucun', inline: false }
            )
            .setFooter({ text: \`${client.config.bot.footer} • Syntaxe: <> = requis, [] = optionnel\` });

        await message.reply({ embeds: [embed] });
    }
};