const Discord = require("discord.js").default || require("discord.js");
const db = require("../db.js");
const config = require("../config");

const owner = db.table("Owner");
const cl = db.table("Color");

module.exports = {
    name: 'role',
    usage: 'role <create/delete> <nom> [couleur]',
    description: 'Gère les rôles',
    async execute(message, args) {
        let color = await cl.get(`color_${message.guild.id}`) || config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {
            const action = args[0];
            const roleName = args[1];

            if (action === "create") {
                const roleColor = args[2] || "RANDOM";
                message.guild.roles.create({
                    name: roleName,
                    color: roleColor
                }).then(role => {
                    message.reply("✅ Rôle " + role.name + " créé");
                }).catch(() => {
                    message.reply("Impossible de créer le rôle");
                });
            } else if (action === "delete") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === roleName);
                if (!role) return message.reply("Rôle introuvable");

                role.delete().then(() => {
                    message.reply("✅ Rôle supprimé");
                }).catch(() => {
                    message.reply("Impossible de supprimer le rôle");
                });
            }
        }
    }
};