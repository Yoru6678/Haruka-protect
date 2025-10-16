const db = require('./db');

class ServerConfig {
    constructor(guildId) {
        this.guildId = guildId;
        this.table = db.table('ServerConfig');
    }
    
    async get(key) {
        return this.table.get(`${this.guildId}.${key}`);
    }
    
    async set(key, value) {
        return this.table.set(`${this.guildId}.${key}`, value);
    }
    
    async getAll() {
        const allData = this.table.all();
        const guildData = {};
        
        allData.forEach(item => {
            if (item.id.startsWith(this.guildId)) {
                const key = item.id.replace(`${this.guildId}.`, '');
                guildData[key] = item.value;
            }
        });
        
        return guildData;
    }
    
    async setupDefaultConfig() {
        const current = await this.getAll();
        
        if (!current.prefix) await this.set('prefix', '+');
        if (!current.logChannel) await this.set('logChannel', null);
        if (!current.autoMod) await this.set('autoMod', {
            antiLink: false,
            antiSpam: false,
            antiInvite: false
        });
        
        return this.getAll();
    }
}

module.exports = ServerConfig;