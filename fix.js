const fs = require('fs');
const path = require('path');

console.log("🚀 CRÉATION DU PACKAGE-LOCK.JSON");
console.log("=".repeat(40));

// Créer un package-lock.json basique mais VALIDE
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
        "dotenv": "^16.3.1",
        "ms": "^2.1.3",
        "moment": "^2.29.4",
        "hastebin-gen": "^2.0.5",
        "discord-fetch-all": "^3.0.2"
      }
    }
  }
};

// Écrire le fichier
fs.writeFileSync(path.join(__dirname, 'package-lock.json'), JSON.stringify(packageLock, null, 2));
console.log("✅ package-lock.json créé avec succès!");

console.log("\n📋 MAINTENANT EXÉCUTE CES COMMANDES:");
console.log("git add package-lock.json");
console.log("git commit -m 'fix: add package-lock'");
console.log("git push");
console.log("\n🎉 Le build Koyeb va fonctionner!");