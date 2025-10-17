const db = require("../db.js");
const Discord = require("discord.js");


const owner = db.table("Owner");
const p = db.table("Prefix");
const config = require("../config");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const ml = db.table("modlog");
const footer = config.bot.footer;
const couleur = config.bot.couleur;

module.exports = {
    name: 'mute',
    usage: 'mute <membre> [temps]',
    description: `Permet de rendre muet un utilisateur sur le serveur',
    async execute(message, args) {
        let pf = await p.get(`prefix_${message.guild.id}');
        if (pf == null) pf = config.bot.prefixe;

        const perm1 = await p1.get(`perm1_${message.guild.id}`);
        const perm2 = await p2.get(`perm2_${message.guild.id}');
        const perm3 = await p3.get(`perm3_${message.guild.id}`);

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!args[0]) return message.channel.send(`**Veuillez mentionner un utilisateur ou fournir son ID !**`);
            if (!target) return message.channel.send('**Veuillez mentionner un utilisateur valide ou fournir un ID valide !**');

            let duration;
            if (args[1]) {
                duration = parseDuration(args[1]);
                if (isNaN(duration) || duration < 0 || duration > 28 * 24 * 60 * 60 * 1000) {
                    return message.channel.send('**Veuillez fournir une durée valide | en m/h/j | inférieur à 27j!**');
                }
            } else {
                duration = 28 * 24 * 60 * 60 * 1000; 
            }

            var reason = args.slice(2).join(" ") || 'Sans raison';

            if (target.id === message.author.id) return message.channel.send('**Vous ne pouvez pas vous rendre muet vous-même !**`);

            try {
                await target.timeout(duration, reason);

                const embed = new (require("discord.js").EmbedBuilder)()
                    .setColor(couleur)
                    .setDescription('**Action**: Mute')`)
**Utilisateur**: ${target.user.tag} (${target.id})
**Modérateur**: ${message.author.tag}
**Durée**: ${ms(duration, { long: true })}
**Raison**: ${reason}')
                    .setTimestamp()
                    .setFooter(footer);
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
            } catch (err) {
                console.error(err);
                message.channel.send('**Une erreur s'est produite en essayant de rendre muet ${target}.**');
            }
        } else {
            message.channel.send(`**Vous n'avez pas les permissions pour utiliser cette commande !**');
        }
    }
};

async function parseDuration(duration) {
    const timeUnits = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        j: 24 * 60 * 60 * 1000, 
    };

    if (typeof duration !== 'string') return NaN;

    const match = duration.match(/^(\d+)(s|m|h|j)$/);
    if (!match) return NaN;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    return value * timeUnits[unit];
}

async function ms(duration, options) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const jours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const heures = Math.floor(duration / (1000 * 60 * 60 * 24))

    const parts = [];
    if (jours) parts.push(`${jours} jour${jours > 1 ? 's' : ''}');
    if (heures) parts.push(`${heures} heure${heures > 1 ? 's' : ''}');
    if (minutes) parts.push('${minutes} minute${minutes > 1 ? 's' : ''}');
    if (seconds) parts.push('${seconds} seconde${seconds > 1 ? 's' : ''}`);

    return parts.join(', ');
}