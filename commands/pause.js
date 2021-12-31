var audioPlayer = require("../utils/player");

module.exports = {
  category: "Music",
  description: "Pauses stream",

  //slash: "both",

  callback: ({}) => {
    audioPlayer.musicStream.pause();
    return "Paused";
  },
};
