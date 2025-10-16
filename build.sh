#!/bin/bash
echo "🛡️  Démarrage du build Haruka Protect..."

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install --production=false

# Vérification de l'installation
if [ -d "node_modules" ]; then
    echo "✅ Dépendances installées avec succès"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

# Vérification des fichiers essentiels
echo "🔍 Vérification des fichiers..."
required_files=("index.js" "config.js" "db.js" "package.json")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Fichier manquant: $file"
        exit 1
    fi
done

echo "✅ Tous les fichiers sont présents"
echo "🎉 Build terminé avec succès !"
