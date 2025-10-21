
const fs = require('fs');
const path = require('path');

class RoleManager {
    static getRoleConfig(guildId) {
        const configPath = path.join(__dirname, '../database/config/roles.json');
        
        if (!fs.existsSync(configPath)) {
            return { vanishRole: null, whitelistRole: null };
        }
        
        try {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            return data[guildId] || { vanishRole: null, whitelistRole: null };
        } catch {
            return { vanishRole: null, whitelistRole: null };
        }
    }
    
    static saveRoleConfig(guildId, key, value) {
        const configDir = path.join(__dirname, '../database/config');
        const configPath = path.join(configDir, 'roles.json');
        
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        let data = {};
        if (fs.existsSync(configPath)) {
            try {
                data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            } catch {
                data = {};
            }
        }
        
        if (!data[guildId]) {
            data[guildId] = {};
        }
        
        data[guildId][key] = value;
        
        fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    }
}

module.exports = RoleManager;