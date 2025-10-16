const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Logger {
    static log(action, user, guild, details = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const logMessage = `[${timestamp}] ${action} | User: ${user} | Guild: ${guild} | ${details}\n`;
        
        console.log(logMessage.trim());
        
        // Écrire dans le fichier de log
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const logFile = path.join(logDir, `${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(logFile, logMessage);
    }
    
    static error(error, context = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const errorMessage = `[${timestamp}] ERROR | Context: ${context} | Message: ${error.message} | Stack: ${error.stack}\n`;
        
        console.error(errorMessage.trim());
        
        // Écrire dans le fichier d'erreurs
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const errorFile = path.join(logDir, `errors-${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(errorFile, errorMessage);
    }
    
    static moderation(action, moderator, target, reason = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const modMessage = `[${timestamp}] MODERATION | Action: ${action} | Mod: ${moderator.tag} (${moderator.id}) | Target: ${target.tag} (${target.id}) | Reason: ${reason}\n`;
        
        console.log(modMessage.trim());
        
        // Écrire dans le fichier de modération
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const modFile = path.join(logDir, `moderation-${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(modFile, modMessage);
    }
}

module.exports = Logger;