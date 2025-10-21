const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');

// 🔐 CHARGEMENT ET VÉRIFICATION DU TOKEN
require('dotenv').config();

if (!process.env.TOKEN) {
    console.error('❌ TOKEN manquant dans le fichier .env');
    console.error('👉 Ajoute TOKEN=ton_token dans .env ou variables d\'environnement');
    process.exit(1);
}

const config = require('./config.js');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');

// Serveur Express pour UptimeRobot
const app = express();
app.get('/', (req, res) => res.send('🌐 Haruka Protect ⚡ Online'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info('✅ Serveur Express actif sur le port ' + PORT));

// Client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = config;
client.logger = logger;

// Cache pour les fichiers JSON
client.cache = {
    roles: null,
    servers: null,
    users: null,
    economy: null
};

// Chargement des handlers
const loadHandlers = async () => {
    const handlers = ['commands', 'events'];
    
    for (const handler of handlers) {
        try {
            const handlerPath = path.join(__dirname, 'handlers', \`${handler}.js\`);
            if (fs.existsSync(handlerPath)) {
                const handlerModule = require(handlerPath);
                await handlerModule(client);
                logger.success(\`Handler chargé: ${handler}\`);
            }
        } catch (error) {
            logger.error(\`Erreur handler ${handler}:\`, error);
        }
    }
};

// 🔐 CONNEXION SÉCURISÉE
client.login(process.env.TOKEN)
    .then(async () => {
        logger.success(\`🟢 ${client.user.tag} connecté avec succès !\`);
        await loadHandlers();
        
        // Statut personnalisé Haruka Protect ⚡
        client.user.setActivity('veille sur le serveur 🌙', { 
            type: ActivityType.Watching 
        });
    })
    .catch(error => {
        logger.error('❌ Erreur de connexion :', error);
        process.exit(1);
    });

// Gestionnaire d'erreurs global
process.on('unhandledRejection', errorHandler.handleRejection);
process.on('uncaughtException', errorHandler.handleException);