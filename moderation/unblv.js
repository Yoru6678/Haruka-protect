(async () => {
const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js")

const config = require("../config")
const owner = db.table("Owner")
const cl = db.table("Color")
const p3 = db.table("Perm3")
const blv = db.table("blvoc")
const footer = config.bot.footer


module.exports = {
    name: 'unblv',
    usage: 'unblv',
    description: `Permet de gérer la blacklist vocal.`,
    async execute(message, args) {


        const perm3 = await p3.get(`perm3_${message.guild.id}`)
 if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (blv.get(`${message.guild.id}.${member.id}.blv`) === null) { return message.channel.send(`${member.username} n'est pas dans la blacklist vocal.`) }
                blv.subtract(`${message.guild.id}.blvcount`, 1)
                blv.delete(`${message.guild.id}.${member.id}.blv`, member.id)
                message.channel.send(`${member.username} n'est plus dans la blacklist vocal.`)


            }
        }
    }
}

})();