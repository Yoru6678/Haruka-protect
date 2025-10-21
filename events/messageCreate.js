const HarukaEmbeds = require('../utils/embeds');
const ErrorHandler = require('../utils/errorHandler');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const prefix = client.config.bot.prefix;
        
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        client.logger.command(message.author.tag, commandName);

        try {
            await command.execute(message, args, client);
        } catch (error) {
            await ErrorHandler.commandError(message, error, commandName);
        }
    }
};