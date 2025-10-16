(async () => {
const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");


const owner = db.table("Owner");
const sanction = db.table("Sanction");
const p = db.table("Prefix");
const cl = db.table("Color");

module.exports = {
    name: 'sanction',
    usage: 'sanction',
    description: `Permet de configuréé la sanction de l'antiraid.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`);
        if (color == null) color = config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let fufu = sanction.get(`sanction_${message.guild.id}`);
            if (fufu == null) fufu = "derank";

            const embed = new (require("discord.js").EmbedBuilder)()
                .setTitle(`Sanction Raid`)
                .setDescription(`Sanction actuelle : `${fufu}``)
                .setColor(color);

            const derank = new (require("discord.js").EmbedBuilder)()
                .setTitle(`Sanction Raid`)
                .setDescription(`Nouvelle Sanction : `derank``)
                .setColor(color);

            const kick = new (require("discord.js").EmbedBuilder)()
                .setTitle(`Sanction Raid`)
                .setDescription(`Nouvelle Sanction : `kick``)
                .setColor(color);

            const ban = new (require("discord.js").EmbedBuilder)()
                .setTitle(`Sanction Raid`)
                .setDescription(`Nouvelle Sanction : `ban``)
                .setColor(color);


            const sanctionRow = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('derank')
                        .setLabel('Derank')
                        .setStyle('Primary')
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('kick')
                        .setLabel('Kick')
                        .setStyle('Danger')
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('ban')
                        .setLabel('Ban')
                        .setStyle('Danger')
                );

            message.channel.send({ embeds: [embed], components: [sanctionRow] }).then(async msg => {

                const collector = message.channel.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    filter: (i => i.user.id === message.author.id)
                });
                collector.on("collect", async (c) => {
                    const value = c.customId;

                    if (value === "derank") {
                        sanction.set(`sanction_${message.guild.id}`, "derank");
                        c.reply({ content: `La sanction en cas de __raid__ sera désormais un **derank**`, ephemeral: true });
                        msg.edit({ embeds: [derank] });
                    }

                    else if (value === "kick") {
                        sanction.set(`sanction_${message.guild.id}`, "kick");
                        c.reply({ content: `La sanction en cas de __raid__ sera désormais un **kick**`, ephemeral: true });
                        msg.edit({ embeds: [kick] });
                    }

                    if (value === "ban") {
                        sanction.set(`sanction_${message.guild.id}`, "ban");
                        c.reply({ content: `La sanction en cas de __raid__ sera désormais un **ban**`, ephemeral: true });
                        msg.edit({ embeds: [ban] });
                    }

                });
            });
        }
    }
};

})();