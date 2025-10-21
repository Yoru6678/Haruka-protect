const HarukaEmbeds = require('../utils/embeds');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcomeChannel = member.guild.channels.cache.find(channel => 
            channel.name.includes('bienvenue') || channel.name.includes('welcome')
        );
        
        if (welcomeChannel) {
            const embed = HarukaEmbeds.custom(
                `👋 Bienvenue ${member.user.username}! - ${client.config.bot.footer}`,
                `Nous sommes maintenant ${member.guild.memberCount} membres!`,
                '#57F287'
            ).setThumbnail(member.user.displayAvatarURL());

            await welcomeChannel.send({ embeds: [embed] });
        }

        client.logger.info(`Nouveau membre: ${member.user.tag} sur ${member.guild.name}`);
    }
};