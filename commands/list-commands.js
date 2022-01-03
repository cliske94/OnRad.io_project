module.exports = {
  category: "Help",
  description: "Lists commands and descriptions",

  slash: "both",

  callback: () => {
    let descriptions = [
      " | Can be used with the -a, -t, and -s flags\n"
        .concat("-a seeds the player with an artist name\n")
        .concat("-t seeds the player with a track, artist name, or both\n")
        .concat("-s immediately plays the station id requested\n")
        .concat(
          "| Default action is to seed the player by genre, i.e. !play rock\n"
        )
        .concat(
          "| Can also be used with a genre name instead of a flag or without any arguments to play the top rated music\n"
        ),
      " | Stops the current music stream and disconnects the bot\n",
      " | Can be used with the -a and -s flags\n"
        .concat("-a searches by artist name\n")
        //.concat("-t searches for a particular track name\n ")
        .concat(
          "-s shows what is playing on a station using ID as parameter\n"
        ),
      " | Joins the bot to a voice channel\n",
      " | Disconnects the bot from a voice channel\n",
    ];
    return "`Play`\n"
      .concat(descriptions[0])
      .concat("`Stop`\n")
      .concat(descriptions[1])
      .concat("`Search`\n")
      .concat(descriptions[2])
      .concat("`Join`\n")
      .concat(descriptions[3])
      .concat("`Unjoin`\n")
      .concat(descriptions[4]);
  },
};
