const db = require("../db.js");
const Discord = require("discord.js");
const config = require("../config");


const owner = db.table("Owner");
const cl = db.table("Color");
const ml = db.table("modlog");
const p3 = db.table("Perm3");

module.exports = {
    name: 'renew',
    usage: 'renew',
    description: `Permet de renew un salon.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await p3.get(`perm3_${message.guild.id}`)) || config.bot.buyer.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`);
            if (color == null) color = config.bot.couleur;

            if (args[0] === "all") {
                const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');

                channels.forEach(async (channel) => {
                    try {
                        let clonedChannel = await channel.clone({
                            name: channel.name,
                            permissions: channel.permissionOverwrites,
                            type: channel.type,
                            topic: channel.topic,
                            nsfw: channel.nsfw,
                            bitrate: channel.bitrate,
                            userLimit: channel.userLimit,
                            rateLimitPerUser: channel.rateLimitPerUser,
                            position: channel.rawPosition,
                            reason: `Tous les salons ont été recréés par ${message.author.tag} (${message.author.id})`
                        });
                        await channel.delete();
                        let sentMessage = await clonedChannel.send(`<@${message.author.id}> Salon recréé !`);
                        setTimeout(() => sentMessage.delete().catch(() => {}), 2000);
                    } catch (error) {
                        console.error(`Erreur lors de la recréation du salon ${channel.name}:`, error);
                    }
                });

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a \`renew\` tous les salons`)
                    .setTimestamp()
                    .setFooter({ text: `📚` });
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);

            } else {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

                if (!channel.deletable) return message.reply("*Impossible de renew ce channel !*");

                try {
                    let clonedChannel = await channel.clone({
                        name: channel.name,
                        permissions: channel.permissionOverwrites,
                        type: channel.type,
                        topic: channel.topic,
                        nsfw: channel.nsfw,
                        bitrate: channel.bitrate,
                        userLimit: channel.userLimit,
                        rateLimitPerUser: channel.rateLimitPerUser,
                        position: channel.rawPosition,
                        reason: `Le salon a été recréé par ${message.author.tag} (${message.author.id})`
                    });
                    await channel.delete();
                    let sentMessage = await clonedChannel.send(`<@${message.author.id}> Salon recréé !`);
                    setTimeout(() => sentMessage.delete().catch(() => {}), 2000);

                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`<@${message.author.id}> a \`renew\` le salon ${channel.name}`)
                        .setTimestamp()
                        .setFooter({ text: `📚` });
                    const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`);
                    if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);

                } catch (error) {
                    console.error(`Erreur lors de la recréation du salon ${channel.name}:`, error);
                }
            }
        }
    }
};
