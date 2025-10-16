const db = require("./db.js");
require("dotenv").config();
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
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();

// Chargement des commandes
function loadCommands(directory) {
    const dirPath = path.join(__dirname, directory);
    if (!fs.existsSync(dirPath)) return;
    
    const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
    
    for (const file of files) {
        try {
            const commandPath = path.join(dirPath, file);
            delete require.cache[require.resolve(commandPath)];
            const command = require(commandPath);
            
            if (command.name && typeof command.execute === 'function') {
                client.commands.set(command.name, command);
                console.log(`   ✅ ${command.name}`);
            }
        } catch (error) {
            console.error(`   ❌ ${file}: ${error.message}`);
        }
    }
}

console.log('\n📦 Chargement des commandes...');
const commandFolders = ['commands', 'moderation', 'parametre', 'gestion', 'utilitaire', 'logs', 'antiraid'];
commandFolders.forEach(folder => loadCommands(folder));
console.log(`\n✅ ${client.commands.size} commandes chargées\n`);

// Gestion des messages
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    
    const prefix = config.bot.prefixe;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || 
                   Array.from(client.commands.values()).find(cmd => 
                       cmd.aliases && cmd.aliases.includes(commandName)
                   );
    
    if (!command) return;
    
    try {
        await command.execute(message, args, client);
        Logger.log(`COMMANDE: ${command.name}`, message.author.tag, message.guild.name, `Args: ${args.join(' ')}`);
    } catch (error) {
        console.error(`❌ Erreur commande ${command.name}:`, error);
        Logger.error(error, `Commande: ${command.name}`);
        
        try {
            await message.reply('❌ Une erreur est survenue.');
        } catch (e) {
            console.error('Impossible de répondre:', e);
        }
    }
});

// Gestion des interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;
    
    try {
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
                    console.error(`❌ Event ${file}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error('❌ Erreur interaction:', error);
    }
});

// Gestion des erreurs
process.on("unhandledRejection", (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    Logger.error(reason, "Unhandled Rejection");
});

process.on("uncaughtException", (err) => {
    console.error('❌ Uncaught Exception:', err);
    Logger.error(err, "Uncaught Exception");
});

// Ready
client.once('ready', () => {
    console.log(`\n✅ Connecté: ${client.user.tag}`);
    console.log(`📊 ${client.guilds.cache.size} serveurs`);
    console.log(`👥 ${client.users.cache.size} utilisateurs`);
    console.log(`⚡ ${client.commands.size} commandes\n`);
    
    client.user.setActivity('+help | Protection', { type: 3 });
});

// Health check pour Koyeb
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ Haruka Protect - En ligne');
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`🌐 Serveur HTTP: ${PORT}\n`);
});

// Connexion
if (!process.env.TOKEN) {
    console.error('❌ Token Discord manquant!');
    console.log('Configure TOKEN sur Koyeb');
    process.exit(1);
}

client.login(process.env.TOKEN)
    .then(() => console.log('🔐 Connexion...'))
    .catch(err => {
        console.error('❌ Erreur:', err.message);
        process.exit(1);
    });