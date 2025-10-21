const HarukaEmbeds = require('../utils/embeds');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        const goodbyeChannel = member.guild.channels.cache.find(channel => 
            channel.name.includes('départ') || channel.name.includes('goodbye')
        );
        
        if (goodbyeChannel) {
            const embed = HarukaEmbeds.custom(
                \`👋 Au revoir ${member.user.username}! - ${client.config.bot.footer}\`,
                \`Nous sommes maintenant ${member.guild.memberCount} membres.\`,
                '#ED4245'
            ).setThumbnail(member.user.displayAvatarURL());

            await goodbyeChannel.send({ embeds: [embed] });
        }

        client.logger.info(\`Membre parti: ${member.user.tag} de ${member.guild.name}\`);
    }
};