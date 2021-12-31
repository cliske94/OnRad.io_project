const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  category: "Music",
  description: "Stops voice connection and music stream",

  slash: "both",

  callback: ({ message, interaction }) => {
    let gid = null;
    if (message) gid = message.guild.id;
    else gid = interaction.guild.id;
    if (gid) {
      //console.log(gid);
      const connection = getVoiceConnection(gid);
      connection.destroy();
      return "Stopped Playing";
    }
  },
};
