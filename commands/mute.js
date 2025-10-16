const { EmbedBuilder } = require("../utils/embedBuilder");
const { PermissionsBitField } = require("discord.js").default || require("discord.js");
const { isAuthorized } = require("../security");
const Logger = require("../utils/logger");

module.exports = {
    name: "mute",
    description: "Mute un membre",
    async execute(message, args) {
        if (!isAuthorized(message) || !message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply({ 
                embeds: [EmbedBuilder.error("Permission refusée. Vous devez être autorisé et avoir la permission de modérer les membres.")]
            });
        }

        const member = message.mentions.members.first();
        const duration = parseInt(args[1]);
        
        if (!member || isNaN(duration) || duration < 1) {
            return message.reply({ 
                embeds: [EmbedBuilder.error("Usage : +mute @membre durée(en minutes)\nExemple: +mute @user 30")]
            });
        }

        if (!member.moderatable) {
            return message.reply({ 
                embeds: [EmbedBuilder.error("Je ne peux pas mute ce membre.")]
            });
        }

        try {
            await member.timeout(duration * 60 * 1000, `Mute par ${message.author.tag}`);
            
            message.channel.send({ 
                embeds: [EmbedBuilder.success(`${member} a été muté pour ${duration} minutes.`)]
            });
            
            Logger.moderation("MUTE", message.author, member, `Durée: ${duration} minutes`);

        } catch (error) {
            console.error(error);
            message.reply({ 
                embeds: [EmbedBuilder.error("Erreur lors du mute du membre.")]
            });
            Logger.error(error, "Commande mute");
        }
    }
};