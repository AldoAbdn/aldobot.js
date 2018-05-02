const {playQueue} = require('../util/playQueue.js');
const yt = require('ytdl-core');
//const streamOptions = {seek: 0, volume: 1}

exports.run = (client, message, args) => {
  if (client.guilds.get(message.guild.id).lock == null){
    client.guilds.get(message.guild.id).lock = false;
  } 
  if (client.guilds.get(message.guild.id).volume == null){
    client.guilds.get(message.guild.id).volume = 1;
  }
  let url = args[0];
  let replay = args[1];
  if (!client.guilds.get(message.guild.id).queue){
    client.guilds.get(message.guild.id).queue = [];
  }
  if (url) {
    yt.getInfo(url, function(err, info){
      if (err) {
        message.reply("Invalid URL");
      }
      console.log(info);
      client.guilds.get(message.guild.id).queue.push(info);
      playQueue(client,message);
    })
  } else {
    playQueue(client,message);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'play',
  description: 'Plays music from a YouTube link',
  usage: 'play <URL>'
};
