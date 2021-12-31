const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  category: "voice",
  description: "Disconnects bot from voice channel",

  slash: "both",
  //testOnly: true,

  callback: ({ message, interaction }) => {
    let gid = null;
    if (message) gid = message.guild.id;
    else gid = interaction.guild.id;
    if (gid) {
      const connection = getVoiceConnection(gid);
      connection.destroy();
      return "Disconnected";
    }
    return "Failed to disconnect";
  },
};
