const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const config = require("../config")
const cl = db.table("Color")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")

module.exports = {
    name: 'say',
    usage: 'say',
    description: `Permet de répéter un message.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)) {

            message.delete();
            if (args.join(" ") == '@everyone') return
            message.channel.send({ content: args.join(" ") });
        }
    }
}