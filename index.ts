import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';
import console from 'console';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

console.log("Loading " + Intents.length + " intents. \n" + Intents.toString);

client.on("ready", () => {
  

  new WOKCommands(client, {
    commandDir: path.join(__dirname, "commands"),
  });
  console.log("The bot is ready");
});

client.login(process.env.TOKEN);

console.log("Connected to Discord")

setInterval(() => {console.log("Heartbeat")}, 5000)