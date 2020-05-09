# AldoBot.js
Discord.js bot

## Inspiration
Heavily inspired by AnIdiotsGuide's tutorial source code [here](https://github.com/AnIdiotsGuide/Tutorial-Bot)

Highly recommend checking out his tutorial [here](https://www.youtube.com/watch?v=rVfjZrqoQ7o&list=PLR2_rarYLHfg6ZJqq0WTMmI9uLcd7_GRO)

## Commands
### Music
| Command       | Description   | Usage |
| ------------- | ------------- | ----- |
| Play          | Plays music from a YouTube Link, or search term  | play (URL) / play(PUT SEARCH HERE) |
| Pause  | Pauses audio  | pause |
| Skip | Skips a song. Pass a track index to remove a specific track in the queue, or leave index blank to skip the currently playing song | skip (index **optional**) |
| Stop | Makes the bot leave the audio channel, clears the queue | stop |
| Volume | Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume | volume (volume **optional**) |
| Playing | Shows currently playing song | playing |
| Queue | Shows current song queue | queue |

### Server Management
| Command     | Description   | Usage |
| ----------- | ------------- | ----- |
| Help        | Displays all the available commands for your permission level, of you can specify a command to get specifics | help (command **optional**) |
| Warn        | Issues a warning to the mentioned user | warn (mention) (reason) |
| Kick        | Kicks the mentioned user | kick (mention) (reason) | 
| Mute        | mutes or unmutes a mentioned user | un/mute (mention) (reason) |
| Ban         | Bans the mentioned user | ban (mention) (reason) |
| Unban       | Unbans the mentioned user | unban (id) (reason) |
| Lockdown    | This will lock a channel down for the set duration, be it in hours, minutes or seconds | lockdown (duration) |
| Purge       | Purges X amount of messages from a given channel | purge (number) |
| Reason      | Updates an unset moderator action | reason (case-number) (new-reason) |
| Reload      | Reloads the command file, if it\'s been updated or modified | reload (commandname) |
| Togglerole | toggles a given role on a user | togglerole (user) (role) |
| Movemessage | Moves a message to a new channel | movemessage (channel) (messageid) | 
| Nickname | Sets a users nickname | nickname (mention) (nickname) |

### Customer Support
| Command     | Description   | Usage |
| ----------- | ------------- | ----- |
| Createticket | Creates a new support ticket case and channel | createticket (user) (issue)|
| issue | Updates issue of a support ticket | issue (case) (issue) |
| status | Updates status of a support ticket | status (case) (update)| 
| Completeticket | Deletes a closed support ticket | completeticket (case) |

### Just for Fun
| Command     | Description   | Usage |
|-------------|---------------|-------|
| Ping        | Ping/Pong command. I wonder what this does? /sarcasm | ping |
| Roll | Simulates rolling a dice. Returns a random number between 1 and the number passed, can be rolled multiple times by adding multiplier | roll (max **optional**) (multipler **optional**)|
| Meta        | Lets a user store data, can be used to store traits for an RPG for example, if pass a string for key that has a - infront of it this will remove that key form your meta data | meta (key) (value **optional**) |

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
To start the bot you will require a Bot token and your own discord user ID

This will involve creating a new bot token which can be done on the discord dev website. Instructions to do so can be found [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

Instructions to find your own user ID can be found [here](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

You will put these into environment variables. More info can be found [here](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)

### Mongodb URL
You are going to need either a local mongobd url or an external one. You will pass this to the application through an environment variable. Example of a local URL is [here](https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp)

Without a mongodb setup you will not be able to use the meta command. To disable the meta command open meta.js in the commands folder and set enabled to false in exports.conf

### Music Via Opus/FFMPEG
This bot uses node-opus to play music, but falls back on FFMPEG. This bot may requir FFMPEG to play music. There are many ways to do this and will depend on your operating system. If you are self hosting the bot on your own machine, simply install FFMPEG and ensure it is set properly in PATH variable. For Heroku hosting, try this [buildpack](https://github.com/shunjikonishi/heroku-buildpack-ffmpeg) 

### Youtube API Key
This bot allows you to play music by either passing a YouTube video URL or a search term. To do this you are required to provide an API key. If you don't you will still be able to play music via URL just not by search term. 

### Server Invite URL
You will need to supply an invite url for your server that is sent to unbanned members

## Starting the Bot
Just to be safe, navigate to the project folder and open a command prompt there. type npm install

Start a command line at the root of the projects folder (If you haven't already done so)

You will need to start the bot with these environment variables: 
```
TOKEN
OWNER_ID
DB
DBNAME
YT_API_KEY
INVITE_URL
```
These will correspond to the values you retrieved earlier. There are many ways to do this but a simple way is:
```
TOKEN=token OWNER_ID=ownerid DB=mongodburlhere DBNAME=nameofdbhere YT_API_KEY=key INVITE_URL=serverurl node AldoBot.js
```
To save yourself time, add this command with your own bot token and owner id to the start script in package.json, being careful not to push the edited repo

