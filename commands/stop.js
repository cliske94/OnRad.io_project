const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  category: "Music",
  description: "Stops voice connection and music stream",

  slash: "both",

  callback: ({ message, interaction }) => {
    let guildId = null;
    if (message) guildId = message.guild.id;
    else guildId = interaction.guild.id;
    if (guildId) {
      const connection = getVoiceConnection(guildId);
      connection.destroy();
      return "Stopped Playing";
    }
  },
};
