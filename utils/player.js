const { createAudioPlayer } = require("@discordjs/voice");

module.exports = {
  musicStream: createAudioPlayer(),
  connection: null,
  connectionId: null,
};
