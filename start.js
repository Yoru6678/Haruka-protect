const fs = require('fs');
const path = require('path');

console.log("🛡️  Haruka Protect - Démarrage...");
console.log("=".repeat(50));

// Vérification des dépendances
const dependencies = [
    'discord.js',
    'dotenv',
    'ms',
    'moment'
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
    'database.json'
];

essentialFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file}`);
    } else {
        console.error(`❌ ${file} - MANQUANT`);
        // Créer les fichiers manquants
        if (file === 'database.json') {
            fs.writeFileSync(path.join(__dirname, file), '{}');
            console.log(`✅ ${file} - CRÉÉ`);
        } else if (file === 'config.js') {
            const defaultConfig = \`module.exports = {
    bot: {
        prefixe: '+',
        buyer: '784847248433479710',
        couleur: '#36adfa',
        footer: 'Haruka Protect',
        maxServer: '2',
    }
};\`;
            fs.writeFileSync(path.join(__dirname, file), defaultConfig);
            console.log(`✅ ${file} - CRÉÉ`);
        } else {
            process.exit(1);
        }
    }
});

// Vérification du token
console.log("🔑 Vérification du token...");
if (!process.env.TOKEN) {
    console.error("❌ Token Discord non trouvé");
    console.log("💡 Configure la variable TOKEN sur Koyeb");
    process.exit(1);
}
console.log("✅ Token Discord trouvé");

// Démarrer le bot
console.log("🚀 Démarrage du bot principal...");
try {
    require('./index.js');
    console.log("✅ Bot démarré avec succès!");
} catch (error) {
    console.error("❌ Erreur démarrage bot:", error);
    process.exit(1);
}
