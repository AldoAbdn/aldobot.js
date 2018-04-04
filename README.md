# AldoBot.js
Discord.js bot

## Inspiration
Heavily inspired by AnIdiotsGuide's tutorial source code [here](https://github.com/AnIdiotsGuide/Tutorial-Bot)

Highly recommend checking out his tutorial [here](https://www.youtube.com/watch?v=rVfjZrqoQ7o&list=PLR2_rarYLHfg6ZJqq0WTMmI9uLcd7_GRO)

## Commands
### Music
| Command       | Description   | Usage |
| ------------- | ------------- | ----- |
| Play          | Plays music from a YouTube Link  | play <URL> |
| Pause  | Pauses audio  | pause |
| Skip | Skips a song. Pass a track index to remove a specific track in the queue, or leave index blank to skip the currently playing song | skip index(optional) |
| Stop | Makes the bot leave the audio channel, clears the queue | stop |
| Volume | Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume | volume volume(optional) |
| Playing | Shows currently playing song | playing |
| Queue | Shows current song queue | queue |
| Lock  | Locks bot to its current voice channel | lock |

### Server Management
| Command     | Description   | Usage |
| ----------- | ------------- | ----- |
| Help        | Displays all the available commands for your permission level, of you can specify a command to get specifics | help command(optional) |
| Warn        | Issues a warning to the mentioned user | warn mention reason |
| Kick        | Kicks the mentioned user | kick mention reason | 
| Mute        | mutes or unmutes a mentioned user | un/mute mention reason |
| Ban         | Bans the mentioned user | ban mention reason |
| Unban       | Unbans the user | unban mention reason |
| Lockdown    | This will lock a channel down for the set duration, be it in hours, minutes or seconds | lockdown duration |
| Purge       | Purges X amount of messages from a given channel | purge number |
| Reason      | Updates an unset moderator action | reason case-number new-reason |
| Reload      | Reloads the command file, if it\'s been updated or modified | reload (commandname) |
| Ping        | Ping/Pong command. I wonder what this does? /sarcasm | ping |

## Setup
Clone this repo

Edit settings.1.JSON filling in required information (all marked in file)

This will involve creating a new bot token which can be done on the discord dev website. Instructions to do so can be found [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

*IMPORTANT* rename the file from settings.1.JSON to just settings.JSON before starting the bot 

## Starting the Bot
Just to be safe, navigate to the project folder and open a command prompt there. type npm install

Start a command line at the root of the projects folder (If you haven't already done so), and type npm start

