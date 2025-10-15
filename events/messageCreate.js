const db = require("../db.js");
const config = require('../config');

const owner = db.table("Owner");
const p = db.table("Prefix");

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.guild) return;

        let prefix = await p.get(`prefix_${message.guild.id}`) || config.bot.prefixe;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(`Erreur lors de l'exécution de ${commandName}:`, error);
            message.reply('Une erreur est survenue lors de l\'exécution de cette commande.').catch(() => false);
        }
    }
};