# 🛡️ Haruka Protect - Déploiement Koyeb

## ✅ Configuration requise

### Variables d'environnement sur Koyeb:
- `TOKEN`: Ton token Discord Bot

### Fichiers essentiels:
- ✅ package.json
- ✅ package-lock.json 
- ✅ .koyeb.yaml
- ✅ start.js (point d'entrée)
- ✅ index.js (bot principal)
- ✅ config.js
- ✅ db.js

## 🚀 Déploiement automatique

Le build Koyeb va:
1. Installer les dépendances avec `npm install --production=false`
2. Démarrer avec `npm start`
3. Health check sur le port 8000

## 🔧 Résolution des problèmes

### Si le build échoue:
1. Vérifie que package-lock.json est présent
2. Vérifie les variables d'environnement
3. Vérifie les logs de build sur Koyeb

### Si le bot ne démarre pas:
1. Vérifie le token Discord
2. Vérifie les logs d'application
3. Teste localement avec `npm start`

## 📞 Support

En cas de problème, vérifie:
- Les logs Koyeb
- La configuration du bot Discord
- Les intents du bot sur le portail Discord
