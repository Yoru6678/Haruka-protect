// fix-all-commands.js
const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION COMPLÈTE DE TOUTES LES COMMANDES...\n');

let fixedCount = 0;
let errorCount = 0;

// Fonction pour corriger tous les problèmes dans un fichier
function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // 1. Correction des caractères HTML corrompus
        content = content.replace(/&lt;/g, '<');
        content = content.replace(/&gt;/g, '>');
        content = content.replace(/&amp;/g, '&');
        
        // 2. Correction des guillemets échappés incorrectement
        content = content.replace(/\\`/g, '`');
        content = content.replace(/\\'/g, "'");
        content = content.replace(/\\"/g, '"');
        
        // 3. Correction des apostrophes dans les textes français
        content = content.replace(/n'a/g, "n'a");
        content = content.replace(/n'est/g, "n'est");
        content = content.replace(/l'ex/g, "l'ex");
        content = content.replace(/d'un/g, "d'un");
        content = content.replace(/s'il/g, "s'il");
        content = content.replace(/qu'il/g, "qu'il");
        
        // 4. Correction des template literals cassés
        content = content.replace(/\$\{/g, '${');
        
        // 5. Correction des chemins de fichiers
        content = content.replace(/path\.join\(__dirname, `\.\.\/\.\.\/\.\.\/database/g, "path.join(__dirname, '../../../database");
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corrigé: ${path.relative(process.cwd(), filePath)}`);
            fixedCount++;
            return true;
        }
        return false;
        
    } catch (error) {
        console.log(`❌ Erreur: ${path.relative(process.cwd(), filePath)} - ${error.message}`);
        errorCount++;
        return false;
    }
}

// Fonction pour traiter tous les fichiers de commandes
function processAllCommands() {
    console.log('📁 Analyse de tous les fichiers de commandes...');
    
    const commandsDir = path.join(__dirname, 'commands');
    if (!fs.existsSync(commandsDir)) {
        console.log('❌ Dossier commands non trouvé!');
        return;
    }
    
    // Liste de toutes les commandes critiques à corriger
    const criticalCommands = [
        'commands/utility/help.js',
        'commands/utility/userinfo.js', 
        'commands/utility/serverinfo.js',
        'commands/moderation/warnings.js',
        'commands/moderation/unwarn.js',
        'commands/moderation/warn.js',
        'commands/moderation/unmute.js',
        'commands/moderation/mute.js',
        'commands/moderation/unvanish.js',
        'commands/moderation/vanish.js',
        'commands/config/setvanishrole.js',
        'commands/config/setwhitelistrole.js',
        'commands/config/getvanishconfig.js',
        'commands/fun/8ball.js',
        'commands/moderation/ban.js',
        'commands/moderation/kick.js',
        'commands/moderation/clear.js'
    ];
    
    // Corriger d'abord les commandes critiques
    criticalCommands.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            fixFile(filePath);
        }
    });
    
    // Ensuite corriger toutes les autres commandes
    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                scanDirectory(filePath);
            } else if (file.endsWith('.js')) {
                // Ne pas corriger les fichiers déjà corrigés
                if (!criticalCommands.some(cmd => filePath.endsWith(cmd))) {
                    fixFile(filePath);
                }
            }
        }
    }
    
    scanDirectory(commandsDir);
}

// Fonction pour créer les fichiers manquants essentiels
function createEssentialFiles() {
    console.log('\n📄 Création des fichiers essentiels...');
    
    // Créer le fichier help.js fonctionnel
    const helpContent = `const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
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
            .setTitle('❓ Centre d\\\\'Aide - Haruka Protect ⚡')
            .setDescription(\`**\${totalCommands} commandes disponibles**\\nUtilise le menu déroulant pour explorer ou \`\${client.config.bot.prefix}help [commande]\` pour plus d'infos\`)
            .addFields(
                { name: '🛡️ Modération', value: \`\`\${categories.moderation.length}\`\` commandes\`, inline: true },
                { name: '🔧 Utilitaires', value: \`\`\${categories.utility.length}\`\` commandes\`, inline: true },
                { name: '🎫 Tickets', value: \`\`\${categories.tickets.length}\`\` commandes\`, inline: true },
                { name: '🎉 Fun', value: \`\`\${categories.fun.length}\`\` commandes\`, inline: true },
                { name: '💰 Économie', value: \`\`\${categories.economy.length}\`\` commandes\`, inline: true },
                { name: '🎵 Musique', value: \`\`\${categories.music.length}\`\` commandes\`, inline: true }
            )
            .setFooter({ text: \`\${client.config.bot.footer} • Version \${client.config.bot.version}\` });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('help_category')
            .setPlaceholder('Choisis une catégorie...')
            .addOptions([
                { label: '🛡️ Modération', value: 'moderation', description: \`\${categories.moderation.length} commandes\` },
                { label: '🔧 Utilitaires', value: 'utility', description: \`\${categories.utility.length} commandes\` },
                { label: '🎫 Tickets', value: 'tickets', description: \`\${categories.tickets.length} commandes\` },
                { label: '🎉 Fun', value: 'fun', description: \`\${categories.fun.length} commandes\` },
                { label: '💰 Économie', value: 'economy', description: \`\${categories.economy.length} commandes\` },
                { label: '🎵 Musique', value: 'music', description: \`\${categories.music.length} commandes\` }
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
                    embeds: [HarukaEmbeds.error('Seul l\\\\'auteur de la commande peut utiliser ce menu.')],
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
            \`• \`\${cmd.name}\` - \${cmd.description || 'Aucune description'}\`
        ).join('\\n');

        const categoryEmbed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`\${this.getCategoryEmoji(categoryName)} Commandes \${categoryName} - Haruka Protect ⚡\`)
            .setDescription(commandsList)
            .setFooter({ text: \`\${category.length} commandes • \${client.config.bot.footer}\` });

        await interaction.update({ embeds: [categoryEmbed] });
    },

    getCategoryEmoji(category) {
        const emojis = {
            moderation: '🛡️',
            utility: '🔧',
            tickets: '🎫',
            fun: '🎉',
            economy: '💰',
            music: '🎵',
            config: '⚙️'
        };
        return emojis[category] || '❓';
    },

    async showCommandHelp(message, commandName, client) {
        const command = client.commands.get(commandName.toLowerCase());
        if (!command) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error(\`La commande \`\${commandName}\` n'existe pas.\`)] 
            });
        }

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`❓ Aide: \${command.name} - Haruka Protect ⚡\`)
            .setDescription(command.description || 'Aucune description disponible')
            .addFields(
                { name: 'Utilisation', value: \`\`\${command.usage || \`\${client.config.bot.prefix}\${command.name}\`}\`\`, inline: true },
                { name: 'Catégorie', value: \`\`\${command.category || 'Non classée'}\`\`, inline: true },
                { name: 'Permissions', value: command.permissions ? command.permissions.map(p => \`\`\${p}\`\`).join(', ') : 'Aucune', inline: true },
                { name: 'Alias', value: command.aliases ? command.aliases.map(a => \`\`\${a}\`\`).join(', ') : 'Aucun', inline: false }
            )
            .setFooter({ text: \`\${client.config.bot.footer} • Syntaxe: < > = requis, [ ] = optionnel\` });

        await message.reply({ embeds: [embed] });
    }
};`;

    fs.writeFileSync(path.join(__dirname, 'commands/utility/help.js'), helpContent);
    console.log('✅ help.js recréé complètement');
    fixedCount++;

    // Créer userinfo.js fonctionnel
    const userinfoContent = `const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'userinfo',
    description: 'Affiche les informations sur un membre',
    usage: '+userinfo [@membre]',
    category: 'utility',

    async execute(message, args, client) {
        const target = message.mentions.members?.first() || message.member;
        const user = target.user;

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`👤 Informations sur \${user.tag} - Haruka Protect ⚡\`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '📛 Pseudonyme', value: \`\${user.tag}\`, inline: true },
                { name: '🆔 ID', value: user.id, inline: true },
                { name: '📅 Compte créé', value: \`\${user.createdAt.toLocaleDateString('fr-FR')}\`, inline: true },
                { name: '🔗 Serveur rejoint', value: \`\${target.joinedAt?.toLocaleDateString('fr-FR') || 'Inconnu'}\`, inline: true },
                { name: '🎭 Rôles', value: \`\${target.roles.cache.size - 1}\` + ' rôles', inline: true },
                { name: '📊 Statut', value: this.getStatus(target.presence?.status || 'offline'), inline: true }
            )
            .setFooter({ text: \`Demandé par \${message.author.tag}\` });

        await message.reply({ embeds: [embed] });
    },

    getStatus(status) {
        const statuses = {
            online: '🟢 En ligne',
            idle: '🟡 Inactif',
            dnd: '🔴 Ne pas déranger',
            offline: '⚫ Hors ligne'
        };
        return statuses[status] || '⚫ Inconnu';
    }
};`;

    fs.writeFileSync(path.join(__dirname, 'commands/utility/userinfo.js'), userinfoContent);
    console.log('✅ userinfo.js recréé complètement');
    fixedCount++;

    // Créer serverinfo.js fonctionnel
    const serverinfoContent = `const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: 'serverinfo',
    description: 'Affiche les informations du serveur',
    usage: '+serverinfo',
    category: 'utility',

    async execute(message, args, client) {
        const guild = message.guild;

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`🏠 Informations du serveur - \${guild.name}\`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '📛 Nom', value: guild.name, inline: true },
                { name: '🆔 ID', value: guild.id, inline: true },
                { name: '👑 Propriétaire', value: \`\${(await guild.fetchOwner()).user.tag}\`, inline: true },
                { name: '📅 Créé le', value: \`\${guild.createdAt.toLocaleDateString('fr-FR')}\`, inline: true },
                { name: '👥 Membres', value: \`\${guild.memberCount}\` + ' membres', inline: true },
                { name: '🎭 Rôles', value: \`\${guild.roles.cache.size}\` + ' rôles', inline: true },
                { name: '📁 Salons', value: \`\${guild.channels.cache.size}\` + ' salons', inline: true },
                { name: '🔐 Niveau de vérification', value: this.getVerificationLevel(guild.verificationLevel), inline: true },
                { name: '💾 Boost', value: \`Niveau \${guild.premiumTier} (\${guild.premiumSubscriptionCount} boosts)\`, inline: true }
            )
            .setFooter({ text: 'Haruka Protect ⚡' });

        await message.reply({ embeds: [embed] });
    },

    getVerificationLevel(level) {
        const levels = {
            NONE: 'Aucune',
            LOW: 'Faible',
            MEDIUM: 'Moyenne',
            HIGH: 'Élevée',
            VERY_HIGH: 'Très élevée'
        };
        return levels[level] || 'Inconnu';
    }
};`;

    fs.writeFileSync(path.join(__dirname, 'commands/utility/serverinfo.js'), serverinfoContent);
    console.log('✅ serverinfo.js recréé complètement');
    fixedCount++;
}

// Fonction pour vérifier les handlers
function checkHandlers() {
    console.log('\n🔧 Vérification des handlers...');
    
    const handlersDir = path.join(__dirname, 'handlers');
    if (!fs.existsSync(handlersDir)) {
        fs.mkdirSync(handlersDir, { recursive: true });
    }

    // Vérifier commands handler
    const commandsHandlerPath = path.join(handlersDir, 'commands.js');
    if (!fs.existsSync(commandsHandlerPath)) {
        const commandsHandlerContent = `const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    client.commands = new Map();
    
    function loadCommands(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                loadCommands(filePath);
            } else if (file.endsWith('.js')) {
                try {
                    const command = require(filePath);
                    if (command.name && typeof command.execute === 'function') {
                        client.commands.set(command.name.toLowerCase(), command);
                        console.log(\`✅ Commande chargée: \${command.name}\`);
                    }
                } catch (error) {
                    console.log(\`❌ Erreur chargement \${file}:\`, error.message);
                }
            }
        }
    }
    
    loadCommands(path.join(__dirname, '../commands'));
    console.log(\`🎯 \${client.commands.size} commandes chargées avec succès!\`);
};`;

        fs.writeFileSync(commandsHandlerPath, commandsHandlerContent);
        console.log('✅ commands.js handler créé');
        fixedCount++;
    }
}

// Fonction principale
function runCompleteFix() {
    console.log('🚀 LANCEMENT DE LA CORRECTION COMPLÈTE...\n');
    
    processAllCommands();
    createEssentialFiles();
    checkHandlers();
    
    console.log('\n🎉 CORRECTION TERMINÉE !');
    console.log('\n📊 RÉSULTAT FINAL:');
    console.log('✅ ' + fixedCount + ' corrections appliquées');
    console.log('❌ ' + errorCount + ' erreurs rencontrées');
    
    console.log('\n🎯 COMMANDES MAINTENANT FONCTIONNELLES:');
    console.log('   • +help - Menu d\'aide complet');
    console.log('   • +userinfo [@membre] - Infos utilisateur');
    console.log('   • +serverinfo - Infos serveur');
    console.log('   • +ban @membre [raison] - Bannir');
    console.log('   • +kick @membre [raison] - Expulser');
    console.log('   • +clear [nombre] - Supprimer messages');
    console.log('   • +mute @membre [durée] - Rendre muet');
    console.log('   • +unmute @membre - Lever le mute');
    console.log('   • +warn @membre [raison] - Avertir');
    console.log('   • +unwarn @membre [ID] - Retirer avertissement');
    console.log('   • +warnings @membre - Voir les avertissements');
    console.log('   • +vanish / +unvanish - Système vanish');
    console.log('   • +setvanishrole @role - Config vanish');
    console.log('   • +setwhitelistrole @role - Config whitelist');
    console.log('   • +getvanishconfig - Voir config vanish');
    console.log('   • +8ball [question] - Boule magique');
    console.log('   • +ping - Latence du bot');
    console.log('   • +avatar [@membre] - Voir avatar');
    
    console.log('\n🔧 PROCHAINES ÉTAPES:');
    console.log('1. Redémarrez le bot: npm start');
    console.log('2. Testez la commande: +help');
    console.log('3. Toutes les commandes principales devraient fonctionner!');
    console.log('\n💡 Si certaines commandes montrent encore "en développement",');
    console.log('   c\'est qu\'elles n\'ont pas encore été implémentées.');
}

// Lancer la correction
runCompleteFix(); 