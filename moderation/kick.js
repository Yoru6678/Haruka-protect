const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");

const owner = db.table("Owner");
const p1 = db.table("Perm1");
const p2 = db.table("Perm2");
const p3 = db.table("Perm3");
const cl = db.table("Color");

module.exports = {
    name: 'kick',
    usage: 'kick <@user> [raison]',
    description: 'Expulse un membre du serveur`,
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}') || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || 
            message.member.roles.cache.has(p1.get(`perm1_${message.guild.id}`)) ||
            message.member.roles.cache.has(p2.get(`perm2_${message.guild.id}')) ||
            message.member.roles.cache.has(p3.get(`perm3_${message.guild.id}`)) ||
            config.bot.buyer.includes(message.author.id)) {

            const member = message.mentions.members.first();
            if (!member) return message.reply("Mentionnez un membre à expulser");

            const reason = args.slice(1).join(" ") || "Aucune raison fournie";

            member.kick(reason).then(() => {
                const embed = new (require("discord.js").EmbedBuilder)()
                    .setDescription('✅ ${member.user.tag} a été expulsé')
Raison: ${reason}')
                    .setColor(color);
                message.channel.send({ embeds: [embed] });
            }).catch(() => {
                message.reply("Je ne peux pas expulser ce membre");
            });
        }
    }
};