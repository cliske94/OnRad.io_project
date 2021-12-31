var audioPlayer = require("../utils/player");

module.exports = {
  category: "Music",
  description: "Pauses stream",

  slash: "both",
  //testOnly: true,

  callback: ({}) => {
    audioPlayer.musicStream.pause();
    return "Paused";
  },
};
