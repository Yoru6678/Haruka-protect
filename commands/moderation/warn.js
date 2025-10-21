const HarukaEmbeds = require('../../utils/embeds');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'warn',
    description: 'Avertir un membre',
    usage: '+warn @membre [raison]',
    permissions: ['ModerateMembers'],
    category: 'moderation',

    async execute(message, args, client) {
        const target = message.mentions.members.first();
        if (!target) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez mentionner un membre à avertir.')] 
            });
        }

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';
        const warnData = this.getWarnData(message.guild.id, target.id);

        warnData.warns.push({
            reason,
            moderator: message.author.tag,
            date: new Date().toISOString(),
            id: warnData.warns.length + 1
        });

        this.saveWarnData(message.guild.id, target.id, warnData);

        const embed = HarukaEmbeds.success(
            `${target.user.tag} a été averti.`,
            'Avertissement ✅ - Haruka Protect ⚡'
        ).addFields(
            { name: 'Raison', value: reason },
            { name: 'Total d'avertissements', value: `${warnData.warns.length}`, inline: true }
        );

        await message.reply({ embeds: [embed] });
        client.logger.command(`WARN: ${target.user.tag} par ${message.author.tag} - ${reason}`);
    },

    getWarnData(guildId, userId) {
        const filePath = path.join(__dirname, '../../../database/warns', `${guildId}.json`);
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

        const filePath = path.join(dirPath, `${guildId}.json`);
        const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
        
        data[userId] = warnData;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};