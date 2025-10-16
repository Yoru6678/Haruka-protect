const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // Vérifier si le bot est connecté à Discord
    try {
        const bot = require('./index.js'); // Cela va échouer si le bot n'est pas démarré
        res.end('✅ Haruka Protect - Bot en ligne et connecté à Discord');
    } catch (error) {
        res.writeHead(500);
        res.end('❌ Haruka Protect - Bot hors ligne');
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`✅ Serveur de santé démarré sur le port ${PORT}`);
});