const config = require('../config');

module.exports = {
    name: 'ready',
    once: true,

    execute(client) {
        console.log(`\n✅ ${client.user.tag} est maintenant en ligne !\n`);
        console.log(`📊 Serveurs: ${client.guilds.cache.size}`);
        console.log(`👥 Utilisateurs: ${client.users.cache.size}`);
        console.log(`📝 Commandes: ${client.commands.size}\n`);
        
        client.user.setActivity(`${config.bot.prefixe}help | ${client.guilds.cache.size} serveurs`, { type: 'WATCHING' });
    }
};