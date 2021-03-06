const env = require("dotenv");
const { default: axios } = require("axios");
const convert = require("xml-js");
env.config();

module.exports = {
  category: "Search",
  description: "Searches based on flags provided as arguments",

  maxArgs: 5,
  minArgs: 1,

  callback: async ({ interaction, args }) => {
    if (interaction != undefined)
      return "Please use the ! prefix, i.e. !search";
    let returnString = "Not playing right now!";
    if (args.length != 0) {
      let searchOptions = "";
      args.forEach((value) => {
        searchOptions = searchOptions.concat(value).concat(" ");
      });
      searchOptions = searchOptions.substring(3);
      switch (args[0]) {
        // Shows what is playing by searching for a numerical station id

        case "-s":
          try {
            await axios({
              method: "get",
              url: "http://api.dar.fm/playlist.php?station_id="
                .concat(args[1])
                .concat("&callback=callback_updateOnNowSongs&"),
            }).then(function (response) {
              let modified = JSON.parse(
                response.data.substring(26, response.data.length - 1)
              );

              returnString = modified[0].title
                .concat(" by ")
                .concat(modified[0].artist);
            });
          } catch (error) {
            console.log(error);
          } finally {
            return returnString;
          }
          break;

        // Shows station IDs playing a specific artist

        case "-a":
          try {
            return await axios({
              method: "get",
              url: "http://api.dar.fm/playlist.php?q="
                .concat(searchOptions)
                .concat("&partner_token=")
                .concat(process.env.PARTNER_TOKEN),
            }).then(function (response) {
              let temp = JSON.parse(
                convert.xml2json(response.data, { compact: true, spaces: 2 })
              );
              if (temp.playlist.station) {
                returnString = "Stations playing "
                  .concat(searchOptions)
                  .concat(":\n");
                temp.playlist.station.forEach((value) => {
                  returnString = returnString
                    .concat(value.title._text.trim())
                    .concat(" by ")
                    .concat(value.artist._text.trim())
                    .concat(" on station ID `")
                    .concat(value.station_id._text.trim())
                    .concat("`, ")
                    .concat(value.callsign._text.trim())
                    .concat("\n");
                });
              }
            });
          } catch (error) {
            console.log(error);
          } finally {
            return returnString;
          }
          break;

        // Track search is not implemented yet

        case "-t":
          break;
        default:
          return "Please use a flag (-a or -s)";
      }
    } else return "This function requires arguments!";
  },
};
