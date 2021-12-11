const { joinVoiceChannel, createAudioResource } = require("@discordjs/voice");
const axios = require("axios");
const convert = require("xml-js");
const play = require("play-dl");
const got = require("got");
const fs = require("fs");
var audioPlayer = require("../utils/player");

module.exports = {
  category: "music",
  description: "Joins to voice channel and plays a file",

  maxArgs: 5,
  slash: "both",
  testOnly: true,

  callback: ({ message, interaction, args }) => {
    let searchOptions = args[0];
    switch (searchOptions) {
      case "stop":
        audioPlayer.musicStream.pause();
        break;
      case "-s":
      case "-a":
      case "-t":
        searchOptions = "";
        args.forEach((value) => {
          searchOptions = searchOptions.concat(value).concat(" ");
        });
        searchOptions = searchOptions.substring(3);
      //console.log(searchOptions);
      default:
        if (
          (interaction != undefined && !interaction.member.voice.channel) ||
          (message != undefined && !message.member.voice.channel)
        )
          return "Please connect to a voice channel!";
        else if (interaction) {
          const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel?.id,
            guildId: interaction.guild?.id,
            adapterCreator: interaction.guild?.voiceAdapterCreator,
          }).subscribe(audioPlayer.musicStream);
          //console.log(interaction.guild.id);
          return request(searchOptions, args, connection, audioPlayer);
        } else if (message) {
          const connection = joinVoiceChannel({
            channelId: message.member.voice.channel?.id,
            guildId: message.guild?.id,
            adapterCreator: message.guild?.voiceAdapterCreator,
          }).subscribe(audioPlayer.musicStream);
          return request(searchOptions, args, connection, audioPlayer);
        } else return "Failed to play!";
    }
  },
};

async function request(searchOptions, args, connection, audioPlayer) {
  let uri = null;
  if (args.length == 0) {
    return "Use /play -a to search for an artist";
  }
  if (searchOptions && args[0] == "-a") {
    uri = "http://api.dar.fm/reco2.php?artist="
      .concat(searchOptions)
      .concat("&partner_token=4730628431");
  } else if (searchOptions && args[0] == "-s") {
    uri = "http://stream.dar.fm/".concat(args[1]);
    let audioStream = got.stream(uri);
    let sResource = createAudioResource(audioStream);
    audioPlayer.musicStream.play(sResource);
    audioPlayer.musicStream.unpause();
    return "Playing";
  } else if (searchOptions && args[0] == "-t") {
    uri = "http://api.dar.fm/playlist.php?q="
      .concat(searchOptions)
      .concat("&partner_token=4730628431");
    let getByStationId = null;
    let title,
      artist = null;
    try {
      await axios({
        method: "get",
        url: uri,
        responseType: "xml",
      }).then(async function (response) {
        //console.log(response.data);
        let temp = JSON.parse(
          convert.xml2json(response.data, { compact: true, spaces: 2 })
        );
        if (temp.playlist.station && temp.playlist.station.length > 1) {
          getByStationId = temp.playlist.station[0].station_id._text.trim();
          title = temp.playlist.station[0].title._text.trim();
          artist = temp.playlist.station[0].artist._text.trim();
        } else if (temp.playlist.station && temp.playlist.station.length == 1) {
          getByStationId = temp.playlist.station.station_id._text.trim();
          title = temp.playlist.station.title._text.trim();
          artist = temp.playlist.station.artist._text.trim();
        } else return "Not found!";
        //console.log(getByStationId);
        let audioStream = got.stream(
          "http://stream.dar.fm/".concat(getByStationId)
        );
        let tResource = createAudioResource(audioStream);
        audioPlayer.musicStream.play(tResource);
        audioPlayer.musicStream.unpause();
        return "Playing";
        // await axios({
        //   method: "get",
        //   url: "https://www.dar.fm/uberstationurl.php?station_id="
        //     .concat(getByStationId)
        //     .concat("&partner_token=123456789"),
        // }).then(() => {
        //   //console.log(response);

        // });
      });
    } catch (error) {
      console.log(error);
    } finally {
      if (getByStationId)
        return "Playing ".concat(title).concat(" by ").concat(artist);
      else return "Not found!";
    }
  }
  if (args.includes("youtube") && args.length == 1) {
    return "Supply a link!";
  } else if (args.includes("youtube")) {
    uri = args[1];
    let player = await play.stream(uri);
    audioPlayer.musicStream.play(createAudioResource(player.stream));
    audioPlayer.musicStream.unpause();
    return "Playing";
  } else if (args[0] == "country") {
    uri =
      "http://api.dar.fm/topsongs.php?q=Country&intl=1&page_size=5&partner_token=4730628431";
  } else if (args[0] == "rock") {
    uri =
      "http://api.dar.fm/topsongs.php?q=Rock&intl=1&page_size=5&partner_token=4730628431";
  } else {
    // uri = "api.dar.fm/reco2.php?artist="
    //   .concat(args[0])
    //   .concat("&partner_token=4730628431");
  }

  // let uri =
  //"http://api.dar.fm/topsongs.php?q=Country&intl=1&page_size=5&partner_token=4730628431";
  let dataJson = { placeholder: null };
  try {
    await axios({
      method: "get",
      url: uri,
      responseType: "xml",
    }).then(async function (response) {
      //console.log(response.data);
      dataJson = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      if (dataJson.songs.song === undefined) return "Search failed!";
      let fixedURI = dataJson.songs.song[0].uberurl.url._text
        .replace("\n", "")
        .trim();
      //console.log(fixedURI);
      let audioStream = got.stream(fixedURI);
      //console.log(player.stream + "\nEND\n");
      //console.log(connection + "\nEND\n");
      resource = createAudioResource(audioStream);
      audioPlayer.musicStream.play(resource);
      audioPlayer.musicStream.unpause();
      //console.log(audioStream);
    });
  } catch (error) {
    //console.log(error);
    return "Search failed!";
  } finally {
    if (!dataJson.songs)
      return "Not on the radio at the moment, try something else!";
    return "Playing "
      .concat(dataJson.songs.song[0].songtitle._text.trim())
      .concat(" by ")
      .concat(dataJson.songs.song[0].songartist._text.trim())
      .concat(" on station ")
      .concat(dataJson.songs.song[0].callsign._text.trim());
  }
}
