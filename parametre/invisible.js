const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");


const config = require("../config");

module.exports = {
  name: 'invisible',
  usage: 'invisible',
  description: `Met le statut du bot en invisible.`,
  async execute(message, args) {

    if (config.bot.buyer.includes(message.author.id)) {

      if (!message.guild) return;

      client.user.setStatus('invisible');
    }
  }
};
