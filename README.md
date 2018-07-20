# AldoBot.js
Discord.js bot

## Inspiration
Heavily inspired by AnIdiotsGuide's tutorial source code [here](https://github.com/AnIdiotsGuide/Tutorial-Bot)

Highly recommend checking out his tutorial [here](https://www.youtube.com/watch?v=rVfjZrqoQ7o&list=PLR2_rarYLHfg6ZJqq0WTMmI9uLcd7_GRO)

## Commands
### Music
| Command       | Description   | Usage |
| ------------- | ------------- | ----- |
| Play          | Plays music from a YouTube Link  | play (URL) |
| Pause  | Pauses audio  | pause |
| Skip | Skips a song. Pass a track index to remove a specific track in the queue, or leave index blank to skip the currently playing song | skip (index **optional**) |
| Stop | Makes the bot leave the audio channel, clears the queue | stop |
| Volume | Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume | volume (volume **optional**) |
| Playing | Shows currently playing song | playing |
| Queue | Shows current song queue | queue |
| Lock  | Locks bot to its current voice channel | lock |

### Server Management
| Command     | Description   | Usage |
| ----------- | ------------- | ----- |
| Help        | Displays all the available commands for your permission level, of you can specify a command to get specifics | help (command **optional**) |
| Warn        | Issues a warning to the mentioned user | warn (mention) (reason) |
| Kick        | Kicks the mentioned user | kick (mention) (reason) | 
| Mute        | mutes or unmutes a mentioned user | un/mute (mention) (reason) |
| Ban         | Bans the mentioned user | ban (mention) (reason) |
| Unban       | Unbans the user | unban (ID) (reason) |
| Lockdown    | This will lock a channel down for the set duration, be it in hours, minutes or seconds | lockdown (duration) |
| Purge       | Purges X amount of messages from a given channel | purge (number) |
| Reason      | Updates an unset moderator action | reason (case-number) (new-reason) |
| Reload      | Reloads the command file, if it\'s been updated or modified | reload (commandname) |

### Just for Fun
| Command     | Description   | Usage |
|-------------|---------------|-------|
| Ping        | Ping/Pong command. I wonder what this does? /sarcasm | ping |
| Roll | Simulates rolling a dice. Returns a random number between 1 and the number passed | roll (max **optional**) |
| Meta        | Lets a user store data, can be used to store traits for an RPG for example | meta (key) (value **optional**) |

## Setup
Clone this repo

Edit settings.JSON changing values to match your requirements 

### Settings
| Settings   | Description |
|------------|-------------|
| prefix     | Set the command prefix here default is ~, so ~play for example |
| adminrolename | Put a custom admin role here |
| modrolename| Put a custom mod role here | 
| defaultrole | Put default role here and bot will add this role to new members of the guild | 
| defaultchannel | This is where bot will send message by default, if set to null will try to find default channel |
| moderationchannel | This is where moderation cases will go, such as bans, if set to null will try to find default channel | 

### Bot Token and User ID
To start the bot you will require a Bot token and your own discord user ID. 

This will involve creating a new bot token which can be done on the discord dev website. Instructions to do so can be found [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

Instructions to find your own user ID can be found [here](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

You will put these into environment variables. More info can be found [here](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html) 

## Starting the Bot
Just to be safe, navigate to the project folder and open a command prompt there. type npm install.

Start a command line at the root of the projects folder (If you haven't already done so).

You will need to start the bot with two environment variables: 
```
TOKEN
OWNDER_ID
```
These will correspond to the values you retrieved earlier. There are many ways to do this but a simple way is:
```
TOKEN=token OWNER_ID=ownerid node AldoBot.js
```


