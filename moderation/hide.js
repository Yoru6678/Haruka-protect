const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const config = require("../config")
const fs = require('fs')
const moment = require('moment')
const p3 = db.table("Perm3")

module.exports = {
    name: 'hide',
    usage: 'hide',
    description: `Permet de cacher un salon`,
    async execute(client, message, args, color) {

        const perm3 = await p3.get(`perm3_${message.guild.id}`)

            let ecolor = await cl.get(`color_${message.guild.id}`)
            if (ecolor == null) color = config.bot.couleur


            if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

                        channel.permissionOverwrites.edit(message.guild.id, {
                            ViewChannel: false,
                        });
                message.channel.send(`Les membres ne peuvent plus voir le salon <#${channel.id}>`);
                message.delete();
            }

            const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setColor(ecolor)
                .setDescription(`<@${message.author.id}> a utilisé la commande \`hide\` le salon <#${message.channel.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const modlog = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));
            if (modlog) modlog.send({ embeds: [embed] }).catch(() => false)
    }
}