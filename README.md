OnRad.io is a search engine for online radio stations, and this is a Discord bot that utilizes its functionality to bring near-demand music service to Discord servers.

To get started running the application locally, clone this repository to an empty directory.

Eventually, a website will be put up for the bot to make integrating it into personal servers much easier, but, right now, the source must be ran locally. To do so, you will need a Discord 
developer API key. This should be stored in a file you create called .env in the root directory of the application. The .env file should contain

`TOKEN=INSERT_API_KEY_HERE`

You must run `npm install` from the cloned directory before running the application to install all of its dependencies.

Once the dependencies from the package.lock file are installed, you should be able to start the application using

`npm run prod`

or

`npm run dev`

These scripts can be modified to your needs.

The play and search commands only support the legacy prefix, i.e. !play or !search.

You can use !list-commands or /list-commands to show a descriptive list of the application's functionality.

You can use !list-genres or /list-genres to show a list of all available genres that can be used to seed the music player.

The join and unjoin commands join or unjoin the bot to or from a current voice connection. They return a prompt stating to join a voice channel if the user is not currently connected.

You can use !stop or /stop to quickly stop the current music steam. This also disconnects the bot from the voice channel.

Credits:
Michael Rober and his team for developing the OnRadio.io API and 
Alexzander Flores for development of the WOKCommands package
