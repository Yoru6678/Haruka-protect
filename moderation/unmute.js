const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");


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
    name: 'unmute',
    usage: 'unmute <membre>',
    description: `Permet de ne plus rendre muet un utilisateur sur le serveur`,
    async execute(message, args) {
        let pf = await p.get(`prefix_${message.guild.id}`);
        if (pf == null) pf = config.bot.prefixe;

        const perm1 = await p1.get(`perm1_${message.guild.id}`);
        const perm2 = await p2.get(`perm2_${message.guild.id}`);
        const perm3 = await p3.get(`perm3_${message.guild.id}`);
        const modlogChannel = ml.get(`${message.guild.id}.modlog`);

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!args[0]) return message.channel.send(`**Veuillez mentionner un utilisateur ou fournir son ID !**`);
            if (!target) return message.channel.send(`**Veuillez mentionner un utilisateur valide ou fournir un ID valide !**`);

            var reason = args.slice(1).join(" ") || 'Aucune';

            try {
                await target.timeout(null, reason);
                
                const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                    .setColor(couleur)
                    .setTitle('Unmute')
                    .setDescription(`${target} a été unmute par ${message.author}.\nRaison : ${reason}`)
                    .setTimestamp()
                    .setFooter(footer);

                if (modlogChannel) {
                    const modlog = client.channels.cache.get(modlogChannel);
                    modlog.send({ embeds: [embed] }).catch(() => false);
                }
            } catch (err) {
                console.error(err);
                message.channel.send(`**Une erreur s'est produite en essayant de lever le mute de ${target}.**`);
            }
        } else {
            message.channel.send(`**Vous n'avez pas les permissions pour utiliser cette commande !**`);
        }
    }
};