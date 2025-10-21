const fs = require('fs');
const path = require('path');

class RoleManager {
    static cache = new Map();

    static getRoleConfig(guildId) {
        const cacheKey = \`roles_${guildId}\`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const filePath = path.join(__dirname, '../database/config/roles.json');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
            return {};
        }

        try {
            const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const guildConfig = config[guildId] || {};
            
            this.cache.set(cacheKey, guildConfig);
            return guildConfig;
        } catch (error) {
            console.error('Erreur lecture config roles:', error);
            return {};
        }
    }

    static saveRoleConfig(guildId, roleType, roleId) {
        const filePath = path.join(__dirname, '../database/config/roles.json');
        let config = {};

        if (fs.existsSync(filePath)) {
            config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        if (!config[guildId]) {
            config[guildId] = {};
        }

        config[guildId][roleType] = roleId;
        
        try {
            fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
            
            const cacheKey = \`roles_${guildId}\`;
            this.cache.set(cacheKey, config[guildId]);
            
            return true;
        } catch (error) {
            console.error('Erreur sauvegarde config roles:', error);
            return false;
        }
    }

    static clearCache(guildId = null) {
        if (guildId) {
            this.cache.delete(\`roles_${guildId}\`);
        } else {
            this.cache.clear();
        }
    }
}

module.exports = RoleManager;