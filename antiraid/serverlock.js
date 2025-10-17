(async () => {
const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")

const owner = db.table("Owner")
const lock = db.table("Serverlock")
const p = db.table("Prefix")
const cl = db.table("Color")

module.exports = {
    name: 'server',
    usage: 'server',
    description: `Permet de fermer l'accès au serveur`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id) === true) {

            if (args[0] === "lock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "lock") return message.channel.send(`**Le serveur est déjà verrouillé**`)
                lock.set(`serverlock_${message.guild.id}`, "lock")
                message.channel.send(`Le serveur est maintenant **verrouillé**`)

            } else if (args[0] === "unlock") {
                if (lock.get(`serverlock_${message.guild.id}`) === "unlock") return message.channel.send(`**Le serveur n'est pas verrouillé**`)
                lock.set(`serverlock_${message.guild.id}`, false)
                message.channel.send(`Le serveur est maintenant **déverrouillé**`)

            }
        }
    }
}
})();