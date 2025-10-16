const db = require("./db.js");
require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const config = require('./config');
const fs = require("fs");
const path = require("path");

console.log("🤖 Haruka Protect - Démarrage...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration
    ],
    partials: [Partials.User, Partials.Message, Partials.Channel]
});

client.commands = new Collection();

// Charger les commandes
function loadCommands() {
    const folders = ['commands', 'moderation', 'antiraid'];
    
    folders.forEach(folder => {
        const folderPath = path.join(__dirname, folder);
        if (!fs.existsSync(folderPath)) return;
        
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
        
        files.forEach(file => {
            try {
                const command = require(path.join(folderPath, file));
                if (command.name && typeof command.execute === 'function') {
                    client.commands.set(command.name, command);
                    console.log(`   ✅ ${command.name}`);
                }
            } catch (error) {
                console.log(`   ❌ ${file}: ${error.message}`);
            }
        });
    });
}

// Message handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    
    const prefix = config.bot.prefixe || '+';
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName);
    if (!command) return;
    
    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(`Erreur ${commandName}:`, error);
        message.reply('❌ Erreur commande').catch(() => {});
    }
});

// Bot ready
client.once('ready', () => {
    console.log(`\n✅ Connecté: ${client.user.tag}`);
    console.log(`📊 ${client.guilds.cache.size} serveurs`);
    console.log(`⚡ ${client.commands.size} commandes\n`);
    
    client.user.setActivity('+help | Protection', { type: 3 });
});

// Health check pour Koyeb
require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ Haruka Protect - En ligne');
}).listen(process.env.PORT || 8000, () => {
    console.log(`🌐 Serveur santé: port ${process.env.PORT || 8000}`);
});

// Démarrer
console.log('\n📦 Chargement des commandes...');
loadCommands();
console.log(`\n✅ ${client.commands.size} commandes chargées`);

if (!process.env.TOKEN) {
    console.error('❌ Token manquant! Configure TOKEN sur Koyeb.');
    process.exit(1);
}

client.login(process.env.TOKEN)
    .then(() => console.log('🔐 Connexion Discord...'))
    .catch(err => {
        console.error('❌ Erreur connexion:', err.message);
        process.exit(1);
    });