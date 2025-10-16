const fs = require('fs');
const path = require('path');

class SimpleDB {
    constructor() {
        this.data = {};
        this.filePath = path.join(__dirname, 'database.json');
        this.load();
    }

    load() {
        try {
            if (fs.existsSync(this.filePath)) {
                const content = fs.readFileSync(this.filePath, 'utf8');
                this.data = JSON.parse(content);
            }
        } catch (error) {
            console.log('❌ Erreur chargement DB:', error.message);
            this.data = {};
        }
    }

    save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.log('❌ Erreur sauvegarde DB:', error.message);
        }
    }

    // Compatible avec quick.db
    table(name) {
        return {
            get: (key) => {
                const keys = key.split('.');
                let value = this.data[name] || {};
                for (const k of keys) {
                    value = value[k];
                    if (value === undefined) return undefined;
                }
                return value;
            },
            set: (key, value) => {
                const keys = key.split('.');
                if (!this.data[name]) this.data[name] = {};
                let current = this.data[name];
                
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) current[keys[i]] = {};
                    current = current[keys[i]];
                }
                
                current[keys[keys.length - 1]] = value;
                this.save();
                return value;
            },
            delete: (key) => {
                const keys = key.split('.');
                if (!this.data[name]) return;
                let current = this.data[name];
                
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) return;
                    current = current[keys[i]];
                }
                
                delete current[keys[keys.length - 1]];
                this.save();
            },
            all: () => {
                const results = [];
                const flatten = (obj, prefix = '') => {
                    for (const key in obj) {
                        const fullKey = prefix ? `${prefix}.${key}` : key;
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            flatten(obj[key], fullKey);
                        } else {
                            results.push({ id: fullKey, value: obj[key] });
                        }
                    }
                };
                flatten(this.data[name] || {});
                return results;
            }
        };
    }

    // Méthodes directes pour compatibilité
    get(key) {
        return this.table('main').get(key);
    }

    set(key, value) {
        return this.table('main').set(key, value);
    }

    delete(key) {
        return this.table('main').delete(key);
    }

    all() {
        return this.table('main').all();
    }
}

// Instance globale
const db = new SimpleDB();
module.exports = db;