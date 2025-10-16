// Test de la base de données
const db = require('./db.js');

console.log("🧪 Test de la base de données...");

// Test des opérations de base
db.set('test.key', 'valeur de test');
console.log('✅ Set:', db.get('test.key'));

db.table('Prefix').set('server123.prefix', '!');
console.log('✅ Table set:', db.table('Prefix').get('server123.prefix'));

// Nettoyer
db.delete('test.key');
db.table('Prefix').delete('server123.prefix');

console.log("✅ Tous les tests passent!");
