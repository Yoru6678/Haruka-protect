require('./ping');
const db = require("./db.js");
require("dotenv").config();
const { Client, Intents, Collection } = require('discord.js');
const Discord = require("discord.js");
const config = require('./config');
const { readdirSync } = require("fs");
const path = require("path");
const fs = require("fs");

const p = db.table("Prefix");
const logembed = db.table("embedlog");
const ms = require("ms");
const color = config.bot.couleur;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

client.commands = new Collection();

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

function loadCommands(directory) {
    const dirPath = path.join(__dirname, directory);
    if (!fs.existsSync(dirPath)) {
        console.log(`⚠️  Dossier ${directory} introuvable`);
        return;
    }
    
    const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
    for (const file of files) {
        try {
            const command = require(path.join(dirPath, file));
            if (command.name) {
                client.commands.set(command.name, command);
            }
        } catch (error) {
            console.error(`❌ Erreur: ${directory}/${file} - ${error.message}`);
        }
    }
}

console.log('\n📦 Chargement des commandes...');
loadCommands('moderation');
loadCommands('parametre');
loadCommands('gestion');
loadCommands('utilitaire');
loadCommands('logs');
loadCommands('antiraid');

console.log('\n📦 Chargement des événements...');
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        try {
            const event = require(path.join(eventsPath, file));
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        } catch (error) {
            console.error(`❌ Erreur: events/${file} - ${error.message}`);
        }
    }
}

process.on("unhandledRejection", (reason, p) => {
    if (reason?.code === 50007) return;
    if (reason?.code === 10062) return;
    if (reason?.code === 10008) return;
    if (reason?.code === 50013) return;
    console.error('❌ Unhandled Rejection:', reason);
});

process.on("uncaughtException", (err, origin) => {
    console.error('❌ Uncaught Exception:', err);
});

process.on("multipleResolves", (type, promise, reason) => {
    console.warn('⚠️  Multiple Resolves:', type, reason);
});

const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
    console.log('⚠️ ', e.replace(regToken, "[REDACTED]"));
});

client.on("error", e => {
    console.error('❌', e.toString().replace(regToken, "[REDACTED]"));
});

client.snipes = new Map();
client.on('messageDelete', function (message) {
    if (!message.guild || message.author.bot) return;
    
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        timestamp: Date.now()
    });
});

if (!process.env.TOKEN) {
    console.error('❌ ERREUR: Variable TOKEN introuvable dans .env');
    process.exit(1);
}

client.login(process.env.TOKEN)
    .then(() => console.log('\n✅ Bot connecté avec succès!'))
    .catch(err => {
        console.error('❌ Erreur de connexion:', err.message);
        process.exit(1);
    });