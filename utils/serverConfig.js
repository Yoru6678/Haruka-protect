const db = require("./db.js");

class ServerConfig {
    constructor(guildId) {
        this.guildId = guildId;
        this.configTable = db.table(`ServerConfig_${guildId}`);
    }
    
    async get(key, defaultValue = null) {
        return await this.configTable.get(key) || defaultValue;
    }
    
    async set(key, value) {
        return await this.configTable.set(key, value);
    }
    
    async delete(key) {
        return await this.configTable.delete(key);
    }
    
    async setupDefaultConfig() {
        const defaultConfig = {
            prefix: '+',
            modRole: null,
            adminRole: null,
            logChannel: null,
            welcomeChannel: null,
            autoMod: {
                antiLink: false,
                antiSpam: false,
                antiMassMention: false,
                maxWarnings: 3
            },
            moderation: {
                muteRole: null,
                tempMuteMax: 1440
            },
            tickets: {
                category: null,
                supportRole: null
            }
        };
        
        for (const [key, value] of Object.entries(defaultConfig)) {
            if (!await this.get(key)) {
                await this.set(key, value);
            }
        }
        
        return defaultConfig;
    }
    
    async getAll() {
        const allData = await this.configTable.all();
        const config = {};
        
        for (const { id, value } of allData) {
            const key = id.replace(`${this.guildId}.`, '');
            config[key] = value;
        }
        
        return config;
    }
}

module.exports = ServerConfig;