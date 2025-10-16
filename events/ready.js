const config = require('../config');

module.exports = {
    name: 'ready',
    once: true,

    execute(client) {
        console.log(`
✅ ${client.user.tag} est maintenant en ligne !
`);
        console.log(`📊 Serveurs: ${client.guilds.cache.size}`);
        console.log(`👥 Utilisateurs: ${client.users.cache.size}`);
        console.log(`📝 Commandes: ${client.commands.size}
`);
        
        client.user.setActivity(`${config.bot.prefixe}help | ${client.guilds.cache.size} serveurs`, { type: 'WATCHING' });
    }
};