const fs = require('fs');
const path = require('path');

console.log("🛡️  Haruka Protect - Démarrage...");
console.log("=".repeat(50));

// Vérification des dépendances
try {
    require('discord.js');
    require('quick.db');
    require('dotenv');
    console.log("✅ Toutes les dépendances sont disponibles");
} catch (error) {
    console.error("❌ Dépendance manquante:", error.message);
    process.exit(1);
}

// Vérification des fichiers essentiels
const essentialFiles = ['config.js', 'db.js'];
essentialFiles.forEach(file => {
    if (!fs.existsSync(path.join(__dirname, file))) {
        console.error(`❌ Fichier manquant: ${file}`);
        process.exit(1);
    }
});
console.log("✅ Tous les fichiers essentiels sont présents");

// Vérification du token
if (!process.env.TOKEN) {
    console.error("❌ Token Discord non trouvé dans les variables d'environnement");
    console.log("💡 Configure la variable TOKEN sur Koyeb");
    process.exit(1);
}

console.log("✅ Token Discord trouvé");
console.log("🚀 Démarrage du bot...");

// Démarrer le bot principal
require('./index.js');
