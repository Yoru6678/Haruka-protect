const logger = require('./logger');

class ErrorHandler {
    static handleRejection(error) {
        logger.error('Rejection non géré:', error);
    }

    static handleException(error) {
        logger.error('Exception non gérée:', error);
        process.exit(1);
    }

    static commandError(message, error, commandName) {
        logger.error(\`Erreur commande ${commandName}:\`, error);
        
        const HarukaEmbeds = require('./embeds');
        return message.reply({ 
            embeds: [HarukaEmbeds.error(
                'Erreur d\'exécution',
                'Une erreur est survenue lors de l\'exécution de cette commande.'
            )] 
        });
    }
}

module.exports = ErrorHandler;