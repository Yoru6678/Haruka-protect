const fs = require('fs');
const path = require('path');

// Création automatique des fichiers JSON manquants
const ensureJsonFile = (filePath, defaultContent = {}) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
    }
};

// Vérification des fichiers de base
ensureJsonFile('./database/config/roles.json');
ensureJsonFile('./database/config/servers.json');
ensureJsonFile('./database/config/users.json');
ensureJsonFile('./database/economy.json');
ensureJsonFile('./database/levels.json');

module.exports = {
    bot: {
        name: 'Haruka Protect ⚡',
        prefix: '+',
        color: '#7289DA',
        footer: 'Haruka Protect ⚡',
        owner: process.env.DEVELOPER_IDS?.split(',').filter(Boolean)[0] || '784847248433479710',
        developers: process.env.DEVELOPER_IDS?.split(',').filter(Boolean) || ["784847248433479710"],
        maxServers: 100,
        version: '5.1.0',
        language: 'fr',
        activity: {
            type: 'WATCHING',
            text: 'veille sur le serveur 🌙'
        }
    },
    database: {
        economy: './database/economy.json',
        warns: './database/warns/',
        config: './database/config/'
    },
    permissions: {
        admin: ['Administrator'],
        mod: ['ManageMessages', 'KickMembers', 'BanMembers', 'ModerateMembers'],
        everyone: []
    },
    emojis: {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        loading: '⏳'
    },
    vanish: {
        defaultRole: 'vanish',
        whitelistRole: 'whitelist',
        cooldown: 5000
    }
};