const { EmbedBuilder } = require("../utils/embedBuilder");
module.exports = {
  name: "help",
  description: "Affiche la liste des commandes",
  execute(message) {
    const embed = EmbedBuilder.info("Voici les commandes disponibles :");
    embed.addFields(
      { name: "+ping", value: "Latence du bot" },
      { name: "+mute", value: "Mute un membre" },
      { name: "+unmute", value: "Démute un membre" },
      { name: "+warn", value: "Avertir un membre" },
      { name: "+warnlist", value: "Voir les avertissements" },
      { name: "+lock / +unlock", value: "Verrouille/déverrouille un salon" },
      { name: "+dmdban", value: "Créer un salon de ban privé" },
      { name: "+ticket", value: "Créer un ticket support" }
    );
    message.channel.send({ embeds: [embed] });
  }
};