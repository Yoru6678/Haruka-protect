const fs = require('fs');
const path = require('path');

console.log("🚀 Haruka Protect - Démarrage V2...");
console.log("=".repeat(50));

// Vérification des dépendances
const dependencies = [
    'discord.js',
    'dotenv',
    'ms',
    'moment',
    'hastebin-gen',
    'discord-fetch-all'
];

console.log("📦 Vérification des dépendances...");
dependencies.forEach(dep => {
    try {
        require(dep);
        console.log(`✅ ${dep}`);
    } catch (error) {
        console.error(`❌ ${dep} - ${error.message}`);
        process.exit(1);
    }
});

// Vérification des fichiers essentiels
console.log("🔍 Vérification des fichiers...");
const essentialFiles = [
    'index.js',
    'config.js', 
    'db.js',
    'database.json',
    'utils/embedBuilder.js',
    'utils/logger.js',
    'utils/serverConfig.js'
];

let allFilesOk = true;
essentialFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file}`);
    } else {
        console.error(`❌ ${file} - MANQUANT`);
        allFilesOk = false;
    }
});

if (!allFilesOk) {
    console.error("❌ Fichiers manquants. Veuillez exécuter: node fix-all-bugs.js");
    process.exit(1);
}

// Vérification du token
console.log("🔑 Vérification du token...");
if (!process.env.TOKEN) {
    console.error("❌ Token Discord non trouvé");
    console.log("💡 Configure la variable TOKEN sur Koyeb");
    process.exit(1);
}
console.log("✅ Token Discord trouvé");

// Démarrer le bot
console.log("🤖 Démarrage du bot principal...");
try {
    require('./index.js');
    console.log("✅ Bot démarré avec succès!");
} catch (error) {
    console.error("❌ Erreur démarrage bot:", error);
    process.exit(1);
}