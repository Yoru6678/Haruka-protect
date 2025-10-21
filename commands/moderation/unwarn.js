const HarukaEmbeds = require('../../utils/embeds');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'unwarn',
    description: 'Retirer un avertissement',
    usage: '+unwarn @membre [ID]',
    permissions: ['ModerateMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre.')] 
            });
        }

        const warnId = parseInt(args[1]);
        if (!warnId) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez spécifier l\'ID de l\'avertissement.')] 
            });
        }

        const warnData = this.getWarnData(message.guild.id, target.id);
        const warnIndex = warnData.warns.findIndex(w => w.id === warnId);

        if (warnIndex === -1) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Avertissement non trouvé.')] 
            });
        }

        const removedWarn = warnData.warns.splice(warnIndex, 1)[0];
        this.saveWarnData(message.guild.id, target.id, warnData);

        const embed = HarukaEmbeds.success(
            \`Avertissement #${warnId} retiré de ${target.user.tag}.\`,
            'Avertissement retiré ✅ - Haruka Protect ⚡'
        ).addFields(
            { name: 'Raison originale', value: removedWarn.reason },
            { name: 'Avertissements restants', value: \`${warnData.warns.length}\`, inline: true }
        );

        await message.reply({ embeds: [embed] });
        client.logger.command(\`UNWARN: ${target.user.tag} par ${message.author.tag} - ID: ${warnId}\`);
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
    },

    saveWarnData(guildId, userId, warnData) {
        const dirPath = path.join(__dirname, '../../../database/warns');
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

        const filePath = path.join(dirPath, \`${guildId}.json\`);
        const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
        
        data[userId] = warnData;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};