const {playQueue} = require('../util/playQueue.js');
const yt = require('ytdl-core');

exports.run = (client, message, args) => {
  const guild = message.guild;
  if (guild.lock == null){
    guild.lock = false;
  } 
  if (guild.volume == null){
    guild.volume = 1;
  }
  let url = args[0];
  let replay = args[1];
  if (!guild.queue){
    guild.queue = [];
  }
  if (url) {
    yt.getInfo(url, function(err, info){
      if (err) {
        message.reply("Invalid URL");
      }
      guild.queue.push(info);
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
