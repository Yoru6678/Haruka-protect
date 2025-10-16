const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const config = require("../config")
const cl = db.table("Color")
const ml = db.table("modlog")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")

module.exports = {
    name: 'clear',
    usage: 'clear',
    description: `Permet de supprimer des messages`,
    async execute(message, args) {
        const perm3 = await p3.get(`perm3_${message.guild.id}`)

        if (message.mentions.members.first()) {


            if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true)

                message.delete()
            message.channel.messages.fetch({ limit: 100 })
                .then((messages) => {
                    var filterUser = message.mentions.members.first().id;
                    var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, 100);
                    message.channel.bulkDelete(filtered, true)

                }).catch(() => false);

        } else
            if (!isNaN(message.content.split(' ')[1])) {
                if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {

                    let amount = 0;
                    if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
                        amount = 1;
                    } else {
                        message.delete()
                        amount = message.content.split(' ')[1];
                        if (amount > 100) {
                            amount = 100;
                        }
                    }
                    await message.channel.bulkDelete(amount, true).then((_message) => {
                    });
                }

                let color = await cl.get(`color_${message.guild.id}`)
                if (color == null) color = config.bot.couleur

                const embed = new (require("discord.js").EmbedBuilder)()
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a `supprimé` ${args[0]} message(s) dans <#${message.channel.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            } else {

                if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {


                    await message.channel.bulkDelete(100, true).then((_message) => {
                    })
                }
            }
    }
}
