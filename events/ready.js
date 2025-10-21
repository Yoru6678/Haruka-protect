const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.logger.success(`✅ ${client.user.tag} est opérationnel !`);
        client.logger.info(`📊 Servant ${client.guilds.cache.size} serveurs`);
        client.logger.info(`👥 Surveillant ${client.users.cache.size} utilisateurs`);
        
        // Statut dynamique Haruka Protect ⚡
        setInterval(() => {
            const activities = [
                'veille sur le serveur 🌙',
                `${client.config.bot.prefix}help • v${client.config.bot.version}`,
                `${client.guilds.cache.size} serveurs`,
                'protège votre communauté 🛡️'
            ];
            const activity = activities[Math.floor(Math.random() * activities.length)];
            
            client.user.setActivity(activity, { type: ActivityType.Watching });
        }, 30000);
    }
};