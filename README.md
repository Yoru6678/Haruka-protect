# Haruka Protect ⚡

Bot Discord multifonction avec système de modération, économie, tickets, musique et bien plus!

## 🚀 Installation Rapide

### 1. Configuration des variables d'environnement

#### Sur Replit:
1. Clique sur l'icône 🔒 "Secrets" dans la barre latérale
2. Ajoute les variables:
   - `TOKEN` = votre_token_discord
   - `DEVELOPER_IDS` = 784847248433479710
   - `PORT` = 3000

#### Sur Koyeb/Heroku/Railway:
1. Dans les paramètres du projet → Environment Variables
2. Ajoute les mêmes variables

#### En local:
```bash
cp .env.example .env
# Édite .env avec ton token Discord
```

### 2. Installation et démarrage

```bash
# Installer les dépendances
npm install

# Tester la syntaxe
npm test

# Démarrer le bot
npm start
```

### 3. Configuration UptimeRobot

1. Crée un compte sur [UptimeRobot](https://uptimerobot.com/)
2. Ajoute un nouveau monitor:
   - Type: HTTP(s)
   - URL: https://votre-app.repl.co/ (ou votre URL de déploiement)
   - Interval: 5 minutes

## ⚙️ Personnalisation

Modifie `config.js` pour personnaliser:
- Nom, couleur, préfixe du bot
- Rôles par défaut
- Messages d'activité
- Et bien plus!

## 📚 Commandes

+ **Modération**: ban, kick, mute, warn, clear, vanish, etc.
+ **Utilitaires**: help, userinfo, serverinfo, avatar, etc.
+ **Fun**: 8ball, meme, joke, etc.
+ **Économie**: balance, daily, work, etc.
+ **Tickets**: ticketsetup, add, close, etc.
+ **Musique**: play, stop, skip, etc.

## 🛡️ Système Vanish

Le système vanish permet aux membres whitelistés de disparaître/reapparaître:
1. Configurer les rôles: `+setvanishrole @role` et `+setwhitelistrole @role`
2. Les membres avec le rôle whitelist peuvent utiliser `+vanish` et `+unvanish`

## 🔧 Support

Pour toute question ou problème, contactez le développeur: <@784847248433479710>

---

**Haruka Protect ⚡ • Version 5.1.0**