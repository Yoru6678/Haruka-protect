const db = require("./db.js");
const config = require("./config");

module.exports = {
  checkOwner(message) {
    const ownerTable = db.table("Owner");
    return ownerTable.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id);
  },
  checkWhitelist(message) {
    const wl = db.table("Whitelist");
    return wl.get(`${message.guild.id}.${message.author.id}.wl`);
  },
  isAuthorized(message) {
    return this.checkOwner(message) || this.checkWhitelist(message);
  }
};