const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  category: "Voice",
  description: "Disconnects bot from voice channel",

  slash: "both",

  callback: ({ message, interaction }) => {
    let gid = null;
    if (message) gid = message.guild.id;
    else gid = interaction.guild.id;
    // Gets connection info and destroys the connection
    if (gid) {
      const connection = getVoiceConnection(gid);
      connection.destroy();
      return "Disconnected";
    }
    return "Failed to disconnect";
  },
};
