const HarukaEmbeds = require('../../utils/embeds');

module.exports = {
    name: '8ball',
    description: 'Pose une question à la boule magique',
    usage: '+8ball [question]',
    category: 'fun',

    async execute(message, args, client) {
        const question = args.join(' ');
        if (!question) {
            return message.reply({ 
                embeds: [HarukaEmbeds.error('Veuillez poser une question.')] 
            });
        }

        const responses = [
            '🎱 Oui, certainement.',
            '🎱 C\'est décidément ainsi.',
            '🎱 Sans aucun doute.',
            '🎱 Oui définitivement.',
            '🎱 Vous pouvez compter dessus.',
            '🎱 Probablement.',
            '🎱 Les signes indiquent que oui.',
            '🎱 Mieux vaut ne pas te le dire maintenant.',
            '🎱 Impossible de prédire maintenant.',
            '🎱 Concentre-toi et demande à nouveau.',
            '🎱 Ne compte pas dessus.',
            '🎱 Ma réponse est non.',
            '🎱 Mes sources disent que non.',
            '🎱 Les perspectives ne sont pas bonnes.',
            '🎱 Très douteux.'
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const embed = HarukaEmbeds.custom(
            '🎱 Boule Magique - Haruka Protect ⚡',
            \`**Question:** ${question}\
**Réponse:** ${response}\`
        );

        await message.reply({ embeds: [embed] });
    }
};