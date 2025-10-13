const db = require("../db.js");
const Discord = require("discord.js");


const config = require("../config");

module.exports = {
  name: 'dnd',
  usage: 'dnd',
  description: `Met le statut du bot en "Ne pas déranger".`,
  async execute(client, message, args) {

    if (config.bot.buyer.includes(message.author.id)) {

      if (!message.guild) return;

      client.user.setStatus('dnd');
    }
  }
};
