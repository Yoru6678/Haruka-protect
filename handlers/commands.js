const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = async (client) => {
    client.commands = new Collection();
    
    const loadCommands = (dir) => {
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            try {
                const command = require(path.join(dir, file));
                if (command.name && typeof command.execute === 'function') {
                    client.commands.set(command.name, command);
                    client.logger.success(\`Commande chargée: ${command.name}\`);
                }
            } catch (error) {
                client.logger.error(\`Erreur chargement commande ${file}:\`, error);
            }
        }

        const subdirs = fs.readdirSync(dir).filter(subdir => 
            fs.statSync(path.join(dir, subdir)).isDirectory()
        );
        
        for (const subdir of subdirs) {
            loadCommands(path.join(dir, subdir));
        }
    };

    loadCommands(path.join(__dirname, '../commands'));
    client.logger.info(\`📦 ${client.commands.size} commandes chargées\`);
};