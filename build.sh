#!/bin/bash
echo "🛡️  Démarrage du build Haruka Protect..."

echo "📦 Installation des dépendances..."
npm install --production=false

echo "🔍 Vérification finale..."
if [ -f "database.json" ]; then
    echo "✅ database.json présent"
else
    echo "{}" > database.json
    echo "✅ database.json créé"
fi

echo "🎉 Build terminé avec succès!"
