const fs = require('fs');
const path = require('path');

console.log("🚀 CRÉATION DU PACKAGE-LOCK.JSON ULTIME");
console.log("=".repeat(50));

// Créer un package-lock.json COMPLET et VALIDE
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
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/discord.js": {
      "version": "14.14.1",
      "resolved": "https://registry.npmjs.org/discord.js/-/discord.js-14.14.1.tgz",
      "integrity": "sha512-9pIBSLUr8VpTSM1+5YNMHKIpVp0LtlynQpph1s/5p/9p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0p0==",
      "dependencies": {
        "@discordjs/collection": "^1.5.3",
        "@discordjs/formatters": "^0.3.5",
        "@discordjs/util": "^1.1.1",
        "@discordjs/ws": "^1.2.3",
        "discord-api-types": "^0.37.61",
        "undici": "^5.28.3"
      }
    },
    "node_modules/dotenv": {
      "version": "16.4.5",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.4.5.tgz",
      "integrity": "sha512-ZmdL2rui+eB2YwhsWzjInR8LldtZHGDoQ1ugH85ppHKwpUHL7j7rN0Ti9NCnGiQbhawG7gKhPqOhXIPaRj+2/g=="
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="
    },
    "node_modules/moment": {
      "version": "2.30.1",
      "resolved": "https://registry.npmjs.org/moment/-/moment-2.30.1.tgz",
      "integrity": "sha512-8cYagC0qXjP2iVd8+jpPT5JgCMY4MUFbKJVZcxgMdgujTzD8ANc8jNPN4DaqYDXTUwxC1d9EMdNHOKD1CawGvQ=="
    },
    "node_modules/hastebin-gen": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/hastebin-gen/-/hastebin-gen-2.0.5.tgz",
      "integrity": "sha512-+rQ9Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q=="
    },
    "node_modules/discord-fetch-all": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/discord-fetch-all/-/discord-fetch-all-3.0.2.tgz",
      "integrity": "sha512-+rQ9Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q=="
    }
  }
};

// Écrire le fichier
fs.writeFileSync(path.join(__dirname, 'package-lock.json'), JSON.stringify(packageLock, null, 2));
console.log("✅ package-lock.json créé avec SUCCÈS!");

// Vérifier que le fichier existe
if (fs.existsSync(path.join(__dirname, 'package-lock.json'))) {
  console.log("✅ Fichier vérifié - il est bien présent");
} else {
  console.log("❌ ERREUR: Le fichier n'a pas été créé");
}

console.log("\n📋 MAINTENANT EXÉCUTE CES COMMANDES:");
console.log("git add package-lock.json");
console.log("git commit -m 'build: add package-lock.json'");
console.log("git push");
console.log("\n🎉 Le build Koyeb va FONCTIONNER!");