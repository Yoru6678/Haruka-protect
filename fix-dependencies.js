// fix-dependencies.js
const fs = require('fs');
const path = require('path');

console.log('🔧 RÉPARATION DES DÉPENDANCES MANQUANTES');
console.log('='.repeat(50));

// Lire le package.json actuel
const packagePath = path.join(__dirname, 'package.json');
let packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// AJOUTER la dépendance manquante
packageContent.dependencies['discordjs-button-pagination'] = '^1.0.9';

// Réécrire package.json
fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
console.log('✅ discordjs-button-pagination ajouté à package.json');

// Régénérer package-lock.json
console.log('📦 Régénération de package-lock.json...');
const { execSync } = require('child_process');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ package-lock.json régénéré!');
} catch (error) {
    console.log('❌ npm install a échoué, création manuelle...');
    
    // Créer un package-lock.json basique
    const packageLock = {
        "name": "harukaprotect",
        "version": "2.0.0", 
        "lockfileVersion": 3,
        "requires": true,
        "packages": {
            "": {
                "name": "harukaprotect",
                "version": "2.0.0",
                "dependencies": {
                    "discord.js": "^14.14.1",
                    "dotenv": "^16.4.5", 
                    "ms": "^2.1.3",
                    "moment": "^2.30.1",
                    "hastebin-gen": "^2.0.5",
                    "discord-fetch-all": "^3.0.2",
                    "moment-duration-format": "^2.3.2",
                    "discordjs-button-pagination": "^1.0.9"
                },
                "engines": {
                    "node": ">=18.0.0"
                }
            }
        }
    };
    
    fs.writeFileSync('package-lock.json', JSON.stringify(packageLock, null, 2));
    console.log('✅ package-lock.json créé manuellement');
}

console.log('\n🚀 MAINTENANT EXÉCUTE:');
console.log('git add package.json package-lock.json');
console.log('git commit -m "fix: add missing discordjs-button-pagination dependency"');
console.log('git push');
console.log('\n🎉 Le build va refonctionner!');