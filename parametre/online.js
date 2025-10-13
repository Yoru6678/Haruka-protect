const db = require("../db.js");
const Discord = require("discord.js");


const config = require("../config");

module.exports = {
  name: 'online',
  usage: 'online',
  description: `Met le statut du bot en ligne.`,
  async execute(client, message, args) {

    if (config.bot.buyer.includes(message.author.id)) {

      if (!message.guild) return;

      client.user.setStatus('online')
    }
  }
};
