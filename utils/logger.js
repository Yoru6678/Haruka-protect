const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Logger {
    static log(action, user, guild, details = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const logEntry = `[${timestamp}] ${action} | User: ${user} | Serveur: ${guild} | Détails: ${details}\n`;
        
        console.log(`📝 ${logEntry.trim()}`);
        
        const logFile = path.join(__dirname, '../logs', `${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(logFile, logEntry);
    }
    
    static error(error, context = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const logEntry = `[${timestamp}] ❌ ERREUR | Contexte: ${context} | Error: ${error.message}\n`;
        
        console.error(`❌ ${logEntry.trim()}`);
        
        const logFile = path.join(__dirname, '../logs', `errors-${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(logFile, logEntry);
    }
    
    static moderation(action, moderator, target, reason = 'Aucune raison') {
        this.log(
            `🛡️ MODERATION: ${action}`,
            moderator.tag,
            moderator.guild?.name || 'Unknown',
            `Cible: ${target.tag} | Raison: ${reason}`
        );
    }
}

module.exports = Logger;