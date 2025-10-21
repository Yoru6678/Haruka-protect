
const chalk = require('chalk');

module.exports = {
    info: (message) => console.log(chalk.blue('[INFO]') + ' ' + message),
    success: (message) => console.log(chalk.green('[SUCCESS]') + ' ' + message),
    error: (message, error = null) => {
        console.log(chalk.red('[ERROR]') + ' ' + message);
        if (error) console.error(error);
    },
    warn: (message) => console.log(chalk.yellow('[WARN]') + ' ' + message),
    command: (message) => console.log(chalk.cyan('[COMMAND]') + ' ' + message)
};