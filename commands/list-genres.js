module.exports = {
  category: "Help",
  description: "Lists genres available for use with play command",

  slash: "both",

  callback: () => {
    return "Rock | Country | Hip-Hop | 70s | 80s | 90s | 00s \n"
      .concat("Christmas | Alternative | Classical | Chill | Indian \n")
      .concat("Trance | Jazz | Latin | Rap | Oldies | Reggae | Soul \n")
      .concat("World | Anything | Metal | Hits | Contemporary | Electronic");
  },
};
