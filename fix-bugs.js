// fix-bugs.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Début de la correction des bugs...');

// 1. Correction des problèmes de syntaxe dans les fichiers de commandes
function fixSyntaxErrors() {
    console.log('📝 Correction des erreurs de syntaxe...');
    
    const problematicFiles = [
        'commands/config/getvanishconfig.js',
        'commands/config/setvanishrole.js',
        'commands/config/setwhitelistrole.js',
        'commands/moderation/unvanish.js',
        'commands/moderation/vanish.js'
    ];

    const fixes = {
        'commands/config/getvanishconfig.js': {
            search: `{ name: '�� Rôle Whitelist', value: whitelistRole ? \`\${whitelistRole} (\\\`\${whitelistRole.id}\\\`)\` : \\\`❌ Non configuré\\n**Par défaut:** \\\`whitelist\\\`\\\`, inline: true }, { name: \\\`�� Commandes disponibles', value: '\\\`+vanish\\\` - Disparaître\\n\\\`+unvanish\\\` - Réapparaître\\n\\\`+setvanishrole\\\` - Configurer le rôle\\n\\\`+setwhitelistrole\\\` - Configurer la whitelist', inline: false }`,
            replace: `{ name: '�� Rôle Whitelist', value: whitelistRole ? \`\${whitelistRole} (\\\`\${whitelistRole.id}\\\`)\` : '❌ Non configuré\\n**Par défaut:** \\\`whitelist\\\`', inline: true }, { name: '�� Commandes disponibles', value: '\\\`+vanish\\\` - Disparaître\\n\\\`+unvanish\\\` - Réapparaître\\n\\\`+setvanishrole\\\` - Configurer le rôle\\n\\\`+setwhitelistrole\\\` - Configurer la whitelist', inline: false }`
        },
        'commands/config/setvanishrole.js': {
            search: `embeds: [HarukaEmbeds.success( \\\`Le rôle \${role} a été défini comme rôle vanish.\\n\\n**Rôle par défaut:** \\\`vanish\\\`\\\`, \\\`Rôle vanish configuré ✅ - Haruka Protect ⚡') )]`,
            replace: `embeds: [HarukaEmbeds.success( \\\`Le rôle \${role} a été défini comme rôle vanish.\\n\\n**Rôle par défaut:** \\\`vanish\\\`\\\`, 'Rôle vanish configuré ✅ - Haruka Protect ⚡' )]`
        },
        'commands/config/setwhitelistrole.js': {
            search: `embeds: [HarukaEmbeds.success( \\\`Le rôle \${role} a été défini comme whitelist vanish.\\n\\n**Rôle par défaut:** \\\`whitelist\\\`\\\`, \\\`Rôle whitelist configuré ✅ - Haruka Protect ⚡') )]`,
            replace: `embeds: [HarukaEmbeds.success( \\\`Le rôle \${role} a été défini comme whitelist vanish.\\n\\n**Rôle par défaut:** \\\`whitelist\\\`\\\`, 'Rôle whitelist configuré ✅ - Haruka Protect ⚡' )]`
        },
        'commands/moderation/unvanish.js': {
            search: `embeds: [HarukaEmbeds.success( \\\`Ton rôle vanish t'a été redonné. Tu es maintenant visible! ��\\n\\nUtilise \\\`+vanish\\\` pour disparaître à nouveau.', \\\`Vanish désactivé ✅ - Haruka Protect ⚡') )]`,
            replace: `embeds: [HarukaEmbeds.success( 'Ton rôle vanish t\\\\'a été redonné. Tu es maintenant visible! ��\\n\\nUtilise \\\`+vanish\\\` pour disparaître à nouveau.', 'Vanish désactivé ✅ - Haruka Protect ⚡' )]`
        },
        'commands/moderation/vanish.js': {
            search: `embeds: [HarukaEmbeds.success( \\\`Ton rôle vanish a été retiré. Tu es maintenant invisible! ��\\n\\nUtilise \\\`+unvanish\\\` pour réapparaître.', \\\`Vanish activé ✅ - Haruka Protect ⚡') )]`,
            replace: `embeds: [HarukaEmbeds.success( 'Ton rôle vanish a été retiré. Tu es maintenant invisible! ��\\n\\nUtilise \\\`+unvanish\\\` pour réapparaître.', 'Vanish activé ✅ - Haruka Protect ⚡' )]`
        }
    };

    problematicFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                const fix = fixes[file];
                if (fix) {
                    content = content.replace(fix.search, fix.replace);
                    fs.writeFileSync(filePath, content);
                    console.log(`✅ ${file} corrigé`);
                }
            } catch (error) {
                console.log(`❌ Erreur avec ${file}:`, error.message);
            }
        }
    });
}

// 2. Correction des problèmes de guillemets et de template literals
function fixQuotesAndTemplates() {
    console.log('🔤 Correction des problèmes de guillemets...');
    
    const commandFiles = [];
    
    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                scanDirectory(filePath);
            } else if (file.endsWith('.js')) {
                commandFiles.push(filePath);
            }
        });
    }
    
    scanDirectory(path.join(__dirname, 'commands'));
    
    commandFiles.forEach(filePath => {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Correction des guillemets inversés mal formés
            content = content.replace(/`{3,}/g, '```');
            
            // Correction des chaînes de caractères mal formées
            content = content.replace(/'`(.*?)`'/g, "'$1'");
            content = content.replace(/`'(.*?)'`/g, "'$1'");
            
            // Correction des échappements de guillemets
            content = content.replace(/\\`/g, '`');
            content = content.replace(/\\'/g, "'");
            content = content.replace(/\\"/g, '"');
            
            fs.writeFileSync(filePath, content);
        } catch (error) {
            console.log(`⚠️ Impossible de traiter ${filePath}: ${error.message}`);
        }
    });
}

// 3. Création des fichiers manquants essentiels
function createMissingFiles() {
    console.log('📁 Création des fichiers manquants...');
    
    // Création du dossier handlers
    const handlersDir = path.join(__dirname, 'handlers');
    if (!fs.existsSync(handlersDir)) {
        fs.mkdirSync(handlersDir, { recursive: true });
    }
    
    // Handler commands.js
    const commandsHandler = `
const fs = require('fs');
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
}`;
    
    fs.writeFileSync(path.join(handlersDir, 'commands.js'), commandsHandler);
    
    // Handler events.js
    const eventsHandler = `
const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    const eventsPath = path.join(__dirname, '../events');
    
    if (!fs.existsSync(eventsPath)) {
        fs.mkdirSync(eventsPath, { recursive: true });
        return;
    }
    
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        try {
            const event = require(path.join(eventsPath, file));
            if (event.name && typeof event.execute === 'function') {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
                console.log(\`✅ Événement chargé: \${event.name}\`);
            }
        } catch (error) {
            console.log(\`❌ Erreur événement \${file}:\`, error.message);
        }
    }
}`;
    
    fs.writeFileSync(path.join(handlersDir, 'events.js'), eventsHandler);
    
    // Création du dossier events avec messageCreate.js
    const eventsDir = path.join(__dirname, 'events');
    if (!fs.existsSync(eventsDir)) {
        fs.mkdirSync(eventsDir, { recursive: true });
    }
    
    const messageCreateEvent = `
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
                            description: \`Vous avez besoin des permissions: \${missingPerms.join(', ')}\`
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
                    description: 'Une erreur est survenue lors de l\\'exécution de cette commande.'
                }]
            });
        }
    }
};`;
    
    fs.writeFileSync(path.join(eventsDir, 'messageCreate.js'), messageCreateEvent);
    
    // Création des utilitaires manquants
    const utilsDir = path.join(__dirname, 'utils');
    if (!fs.existsSync(utilsDir)) {
        fs.mkdirSync(utilsDir, { recursive: true });
    }
    
    // logger.js
    const loggerUtil = `
const chalk = require('chalk');

module.exports = {
    info: (message) => console.log(chalk.blue('[INFO]') + ' ' + message),
    success: (message) => console.log(chalk.green('[SUCCESS]') + ' ' + message),
    error: (message, error = null) => {
        console.log(chalk.red('[ERROR]') + ' ' + message);
        if (error) console.error(error);
    },
    warn: (message) => console.log(chalk.yellow('[WARN]') + ' ' + message),
    command: (message) => console.log(chalk.cyan('[COMMAND]') + ' ' + message)
};`;
    
    fs.writeFileSync(path.join(utilsDir, 'logger.js'), loggerUtil);
    
    // embeds.js
    const embedsUtil = `
const { EmbedBuilder } = require('discord.js');

module.exports = {
    success: (description, title = 'Succès ✅ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    error: (description, title = 'Erreur ❌ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    info: (description, title = 'Information ℹ️ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    warn: (description, title = 'Attention ⚠️ - Haruka Protect ⚡') => {
        return new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    },
    
    custom: (title, description, color = '#7289DA') => {
        return new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    }
};`;
    
    fs.writeFileSync(path.join(utilsDir, 'embeds.js'), embedsUtil);
    
    // roleManager.js
    const roleManagerUtil = `
const fs = require('fs');
const path = require('path');

class RoleManager {
    static getRoleConfig(guildId) {
        const configPath = path.join(__dirname, '../database/config/roles.json');
        
        if (!fs.existsSync(configPath)) {
            return { vanishRole: null, whitelistRole: null };
        }
        
        try {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            return data[guildId] || { vanishRole: null, whitelistRole: null };
        } catch {
            return { vanishRole: null, whitelistRole: null };
        }
    }
    
    static saveRoleConfig(guildId, key, value) {
        const configDir = path.join(__dirname, '../database/config');
        const configPath = path.join(configDir, 'roles.json');
        
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        let data = {};
        if (fs.existsSync(configPath)) {
            try {
                data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            } catch {
                data = {};
            }
        }
        
        if (!data[guildId]) {
            data[guildId] = {};
        }
        
        data[guildId][key] = value;
        
        fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    }
}

module.exports = RoleManager;`;
    
    fs.writeFileSync(path.join(utilsDir, 'roleManager.js'), roleManagerUtil);
    
    // errorHandler.js
    const errorHandlerUtil = `
module.exports = {
    handleRejection: (reason, promise) => {
        console.error('Rejection non gérée à:', promise, 'raison:', reason);
    },
    
    handleException: (error) => {
        console.error('Exception non gérée:', error);
        process.exit(1);
    }
};`;
    
    fs.writeFileSync(path.join(utilsDir, 'errorHandler.js'), errorHandlerUtil);
}

// 4. Correction du fichier package.json
function fixPackageJson() {
    console.log('📦 Correction du package.json...');
    
    const packagePath = path.join(__dirname, 'package.json');
    if (fs.existsSync(packagePath)) {
        try {
            const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            // Ajout de scripts manquants
            if (!packageData.scripts) {
                packageData.scripts = {};
            }
            
            packageData.scripts.start = "node index.js";
            packageData.scripts.dev = "nodemon index.js";
            packageData.scripts.test = "node -c index.js";
            
            // Vérification des dépendances
            if (!packageData.dependencies) {
                packageData.dependencies = {};
            }
            
            const requiredDeps = {
                "discord.js": "^14.15.3",
                "dotenv": "^16.4.5",
                "express": "^4.19.2",
                "chalk": "^4.1.2",
                "moment": "^2.29.4",
                "fs-extra": "^11.2.0"
            };
            
            Object.keys(requiredDeps).forEach(dep => {
                if (!packageData.dependencies[dep]) {
                    packageData.dependencies[dep] = requiredDeps[dep];
                }
            });
            
            fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
            console.log('✅ package.json corrigé');
        } catch (error) {
            console.log('❌ Erreur package.json:', error.message);
        }
    }
}

// 5. Création de la structure de base de données
function createDatabaseStructure() {
    console.log('🗄️ Création de la structure de base de données...');
    
    const dbDirs = [
        'database',
        'database/config',
        'database/warns'
    ];
    
    dbDirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
    
    // Fichiers de base de données par défaut
    const dbFiles = {
        'database/config/roles.json': '{}',
        'database/config/servers.json': '{}',
        'database/config/users.json': '{}',
        'database/economy.json': '{}',
        'database/levels.json': '{}'
    };
    
    Object.keys(dbFiles).forEach(file => {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, dbFiles[file]);
        }
    });
}

// 6. Correction du fichier index.js principal
function fixIndexFile() {
    console.log('🔧 Correction du fichier index.js...');
    
    const indexPath = path.join(__dirname, 'index.js');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Correction de l'import des handlers
        content = content.replace(
            `const loadHandlers = async () => {
    const handlers = ['commands', 'events'];
    
    for (const handler of handlers) {
        try {
            const handlerPath = path.join(__dirname, 'handlers', \\\`\${handler}.js\\\`);
            if (fs.existsSync(handlerPath)) {
                const handlerModule = require(handlerPath);
                await handlerModule(client);
                logger.success(\\\`Handler chargé: \${handler}\\\`);
            }
        } catch (error) {
            logger.error(\\\`Erreur handler \${handler}:\\\`, error);
        }
    }
};`,
            `const loadHandlers = async () => {
    try {
        const commandsHandler = require('./handlers/commands');
        await commandsHandler(client);
        logger.success('Handler chargé: commands');
        
        const eventsHandler = require('./handlers/events');
        await eventsHandler(client);
        logger.success('Handler chargé: events');
    } catch (error) {
        logger.error('Erreur chargement handlers:', error);
    }
};`
        );
        
        fs.writeFileSync(indexPath, content);
        console.log('✅ index.js corrigé');
    }
}

// Exécution de toutes les corrections
function runAllFixes() {
    console.log('🚀 Lancement de la correction complète...\n');
    
    createDatabaseStructure();
    createMissingFiles();
    fixPackageJson();
    fixSyntaxErrors();
    fixQuotesAndTemplates();
    fixIndexFile();
    
    console.log('\n🎉 Correction terminée !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Exécutez: npm install');
    console.log('2. Configurez votre .env avec le TOKEN Discord');
    console.log('3. Lancez le bot: npm start');
    console.log('\n⚠️  Vérifiez que tous les modules sont installés:');
    console.log('   npm install discord.js dotenv express chalk moment fs-extra');
}

// Exécution du script
runAllFixes();