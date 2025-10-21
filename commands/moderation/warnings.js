const { EmbedBuilder } = require('discord.js');
const HarukaEmbeds = require('../../utils/embeds');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'warnings',
    description: 'Voir les avertissements d\'un membre',
    usage: '+warnings @membre',
    permissions: ['ModerateMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first() || message.member;
        const warnData = this.getWarnData(message.guild.id, target.id);

        if (warnData.warns.length === 0) {
            return message.reply({ 
                embeds: [HarukaEmbeds.info(\`${target.user.tag} n'a aucun avertissement.\`)] 
            });
        }

        const embed = new EmbedBuilder()
            .setColor(client.config.bot.color)
            .setTitle(\`📋 Avertissements de ${target.user.tag} - Haruka Protect ⚡\`)
            .setDescription(\`Total: ${warnData.warns.length} avertissement(s)\`)
            .setFooter({ text: client.config.bot.footer });

        warnData.warns.slice(0, 10).forEach(warn => {
            embed.addFields({
                name: \`#${warn.id} - ${new Date(warn.date).toLocaleDateString('fr-FR')}\`,
                value: \`**Raison:** ${warn.reason}\
**Modérateur:** ${warn.moderator}\`,
                inline: false
            });
        });

        await message.reply({ embeds: [embed] });
    },

    getWarnData(guildId, userId) {
        const filePath = path.join(__dirname, '../../../database/warns', \`${guildId}.json\`);
        if (!fs.existsSync(filePath)) return { warns: [] };
        
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return data[userId] || { warns: [] };
        } catch {
            return { warns: [] };
        }
    }
};