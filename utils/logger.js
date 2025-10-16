const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Logger {
    static log(action, user, guild, details = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const logMessage = `[${timestamp}] ${action} | ${user} | ${guild} | ${details}
`;
        console.log(logMessage.trim());
        
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const logFile = path.join(logDir, `${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(logFile, logMessage);
    }
    
    static error(error, context = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const errorMessage = `[${timestamp}] ERROR | ${context} | ${error.message}
`;
        console.error(errorMessage.trim());
        
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const errorFile = path.join(logDir, `errors-${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(errorFile, errorMessage);
    }
    
    static moderation(action, moderator, target, reason = '') {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const modMessage = `[${timestamp}] MOD | ${action} | ${moderator.tag} -> ${target.tag} | ${reason}
`;
        console.log(modMessage.trim());
        
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        
        const modFile = path.join(logDir, `moderation-${moment().format('YYYY-MM-DD')}.log`);
        fs.appendFileSync(modFile, modMessage);
    }
}

module.exports = Logger;