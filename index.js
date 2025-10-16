const db = require("./db.js");
require("dotenv").config();
const db = require('./db.js');
const { Client, GatewayIntentBits, Collection, Partials, ComponentType } = require('discord.js');
const config = require('./config');
const { readdirSync } = require("fs");
const path = require("path");
const fs = require("fs");

const Logger = require('./utils/logger');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ],
    restTimeOffset: 0,
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();

// Fonction pour charger les commandes
function loadCommands(directory) {
    const dirPath = path.join(__dirname, directory);
    if (!fs.existsSync(dirPath)) {
        console.log(`⚠️  Dossier ${directory} introuvable`);
        return;
    }
    
    const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
    for (const file of files) {
        try {
            const commandPath = path.join(dirPath, file);
            delete require.cache[require.resolve(commandPath)];
            const command = require(commandPath);
            
            if (command.name && typeof command.execute === 'function') {
                client.commands.set(command.name, command);
                console.log(`✅ Commande chargée: ${command.name} (${directory}/${file})`);
            } else {
                console.log(`⚠️  Commande invalide: ${directory}/${file}`);
            }
        } catch (error) {
            console.error(`❌ Erreur chargement: ${directory}/${file} - ${error.message}`);
        }
    }
}

console.log('\\n🛡️  Chargement des commandes...');

// Charger toutes les commandes de tous les dossiers
const commandFolders = ['commands', 'moderation', 'parametre', 'gestion', 'utilitaire', 'logs', 'antiraid'];
commandFolders.forEach(folder => {
    loadCommands(folder);
});

console.log(`\\n📊 Total des commandes chargées: ${client.commands.size}`);

// Gestion des commandes avec préfixe
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    
    const prefix = config.bot.prefixe;
    
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName);
    if (!command) {
        // Vérifier les alias
        const aliasCommand = Array.from(client.commands.values()).find(cmd => 
            cmd.aliases && cmd.aliases.includes(commandName)
        );
        if (!aliasCommand) return;
        
        console.log(`🔍 Alias trouvé: ${commandName} -> ${aliasCommand.name}`);
        await executeCommand(aliasCommand, message, args);
        return;
    }
    
    await executeCommand(command, message, args);
});

async function executeCommand(command, message, args) {
    try {
        await command.execute(message, args, client);
        Logger.log(`COMMANDE: ${command.name}`, message.author.tag, message.guild.name, `Args: ${args.join(' ')}`);
    } catch (error) {
        console.error(`❌ Erreur commande ${command.name}:`, error);
        Logger.error(error, `Commande: ${command.name}`);
        
        try {
            await message.reply('❌ Une erreur est survenue lors de l\\\'exécution de cette commande.');
        } catch (replyError) {
            console.error('Impossible de répondre à la commande:', replyError);
        }
    }
}

// Gestion des interactions (boutons, menus)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;
    
    try {
        // Rechercher le gestionnaire d'interactions dans les events
        const eventsPath = path.join(__dirname, 'events');
        if (fs.existsSync(eventsPath)) {
            const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                try {
                    const event = require(path.join(eventsPath, file));
                    if (event.name === 'interactionCreate' && typeof event.execute === 'function') {
                        await event.execute(client, interaction);
                    }
                } catch (error) {
                    console.error(`❌ Erreur event: ${file} - ${error.message}`);
                }
            }
        }
    } catch (error) {
        console.error('❌ Erreur interaction:', error);
    }
});

// Gestion des erreurs
process.on("unhandledRejection", (reason, p) => {
    Logger.error(reason, "Unhandled Rejection");
});

process.on("uncaughtException", (err, origin) => {
    Logger.error(err, "Uncaught Exception");
});

// Événement ready
client.once('ready', () => {
    console.log(`\\n🎉 Connecté en tant que ${client.user.tag}!`);
    console.log(`📊 Servant ${client.guilds.cache.size} serveurs`);
    console.log(`👥 Surveillant ${client.users.cache.size} utilisateurs`);
    console.log(`🛡️  ${client.commands.size} commandes chargées`);
    console.log(`🛡️  Haruka Protect est opérationnel!\\n`);
    
    client.user.setActivity('+help | Protection', { type: 3 }); // WATCHING
});

// Serveur HTTP pour Koyeb health check
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('🛡️ Haruka Protect - Bot en ligne');
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`✅ Serveur HTTP démarré sur le port ${PORT}`);
});

// Connexion du bot
if (!process.env.TOKEN) {
    console.error('❌ ERREUR: Token Discord non trouvé');
    console.log('💡 Assure-toi d\'avoir configuré la variable TOKEN sur Koyeb');
    process.exit(1);
}

client.login(process.env.TOKEN)
    .then(() => console.log('\\n🔗 Connexion à Discord...'))
    .catch(err => {
        console.error('❌ Erreur de connexion:', err.message);
        process.exit(1);
    });