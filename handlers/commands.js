
const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    client.commands = new Map();
    
    function loadCommands(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                loadCommands(filePath);
            } else if (file.endsWith('.js')) {
                try {
                    const command = require(filePath);
                    if (command.name && typeof command.execute === 'function') {
                        client.commands.set(command.name.toLowerCase(), command);
                        console.log(`✅ Commande chargée: ${command.name}`);
                    }
                } catch (error) {
                    console.log(`❌ Erreur chargement ${file}:`, error.message);
                }
            }
        }
    }
    
    loadCommands(path.join(__dirname, '../commands'));
}