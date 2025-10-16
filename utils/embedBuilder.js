const { EmbedBuilder } = require("discord.js");
const config = require("../config");

class EmbedBuilder {
    static success(desc) {
        return new EmbedBuilder()
            .setDescription("✅ " + desc)
            .setColor("#00ff00")
            .setTimestamp();
    }
    
    static error(desc) {
        return new EmbedBuilder()
            .setDescription("❌ " + desc)
            .setColor("#ff0000")
            .setTimestamp();
    }
    
    static warn(desc) {
        return new EmbedBuilder()
            .setDescription("⚠️ " + desc)
            .setColor("#ffa500")
            .setTimestamp();
    }
    
    static info(desc) {
        return new EmbedBuilder()
            .setDescription("ℹ️ " + desc)
            .setColor(config.bot.couleur)
            .setTimestamp();
    }
    
    static modLog(mod, action, target, reason = "Aucune raison") {
        return new EmbedBuilder()
            .setTitle("🛡️ Modération")
            .addFields(
                { name: "Modérateur", value: `${mod.tag} (${mod.id})`, inline: true },
                { name: "Cible", value: `${target.tag} (${target.id})`, inline: true },
                { name: "Action", value: action, inline: true },
                { name: "Raison", value: reason }
            )
            .setColor("#ffa500")
            .setTimestamp();
    }
    
    static securityAlert(action, target, details = "") {
        return new EmbedBuilder()
            .setTitle("🚨 Alerte Sécurité")
            .addFields(
                { name: "Action", value: action, inline: true },
                { name: "Cible", value: `${target.tag} (${target.id})`, inline: true },
                { name: "Détails", value: details || "Aucun détail supplémentaire" }
            )
            .setColor("#ff4444")
            .setTimestamp();
    }
}

module.exports = EmbedBuilder;