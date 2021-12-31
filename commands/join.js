const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  category: "voice",
  description: "Joins to voice channel",

  slash: "both",

  callback: ({ message, interaction }) => {
    if (
      (interaction && !interaction.member.voice.channel) ||
      (message != undefined && !message.member.voice.channel)
    )
      return "Please connect to a voice channel!";
    else if (interaction) {
      joinVoiceChannel({
        channelId: interaction.member.voice.channel?.id,
        guildId: interaction.guild?.id,
        adapterCreator: interaction.guild?.voiceAdapterCreator,
      });
    } else if (message) {
      joinVoiceChannel({
        channelId: message.member.voice.channel?.id,
        guildId: message.guild?.id,
        adapterCreator: message.guild?.voiceAdapterCreator,
      });
    } else return "Failed to connect!";
    return "Joined!";
  },
};
