const chalk = require('chalk');
const moment = require('moment');

class Logger {
    static getTimestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    static info(message) {
        console.log(\`${chalk.blue('ℹ️')} ${chalk.gray(this.getTimestamp())} ${chalk.cyan('[INFO]')} ${message}\`);
    }

    static success(message) {
        console.log(\`${chalk.green('✅')} ${chalk.gray(this.getTimestamp())} ${chalk.green('[SUCCESS]')} ${message}\`);
    }

    static error(message, error = null) {
        console.log(\`${chalk.red('❌')} ${chalk.gray(this.getTimestamp())} ${chalk.red('[ERROR]')} ${message}\`);
        if (error) console.error(error);
    }

    static warn(message) {
        console.log(\`${chalk.yellow('⚠️')} ${chalk.gray(this.getTimestamp())} ${chalk.yellow('[WARN]')} ${message}\`);
    }

    static command(userTag, commandName) {
        console.log(\`${chalk.blue('⚡')} ${chalk.gray(this.getTimestamp())} ${chalk.blue('[COMMAND]')} ${chalk.yellow(userTag)} → ${chalk.green(commandName)}\`);
    }
}

module.exports = Logger;