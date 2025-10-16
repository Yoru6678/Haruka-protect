const { EmbedBuilder } = require("../utils/embedBuilder");

module.exports = {
    name: "avatar",
    description: "Affiche l'avatar d'un utilisateur",
    async execute(message, args) {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;
        
        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${user.tag}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("#36adfa")
            .setFooter({ text: `Haruka Protect • ${message.guild.name}`, iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};