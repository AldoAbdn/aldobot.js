const {playQueue} = require('../util/playQueue.js');
const yt = require('ytdl-core');

exports.run = (client, message, args) => {
  //If no lock attribute, make one
  if (message.guild.lock == null){
    message.guild.lock = false;
  } 
  //If no volume attribute, make one
  if (message.guild.volume == null){
    message.guild.volume = 1;
  }
  //If no queue attribute, make one
  if (!message.guild.queue){
    message.guild.queue = [];
  }
  //Set variables
  let url = args[0];
  let replay = args[1];
  //If url, get YT info and add to queue 
  if (url) {
    //Get YT info
    yt.getInfo(url, function(err, info){
      //If error, return message
      if (err) {
        message.reply("Invalid URL");
        return;
      }
      //Push YT to queue
      message.guild.queue.push(info);
    })
  }
  //Play queue
  playQueue(client,message);
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
