#!/bin/bash
echo "🚀 DÉPLOIEMENT HARUKA PROTECT"
echo "=============================="

# Vérifier Node.js
echo "📦 Vérification Node.js..."
node --version || { echo "❌ Node.js non installé"; exit 1; }

# Installer dépendances
echo "📥 Installation dépendances..."
npm install discord.js@^14.14.1 dotenv@^16.4.5 moment@^2.30.1 ms@^2.1.3

# Vérifier le token
echo "🔑 Vérification token..."
if [ -z "$TOKEN" ]; then
    echo "⚠️  TOKEN non défini (normal en local)"
else
    echo "✅ TOKEN configuré"
fi

# Démarrer
echo "🤖 Démarrage du bot..."
node index.js
