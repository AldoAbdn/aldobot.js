const {playQueue} = require('../util/playQueue.js');
const yt = require('ytdl-core');
exports.run = (client, message, args) => {
  //Variables
  var lock = message.guild.lock;
  var volume = message.guild.volume;
  var queue = message.guild.queue;
  //If no lock attribute, make one
  if (lock == null){
    message.guild.lock = false;
    lock = message.guild.lock
  } 
  //If no volume attribute, make one
  if (volume == null){
    message.guild.volume = 1;
    volume = message.guild.volume;
  }
  //If no queue attribute, make one
  if (!queue){
    message.guild.queue = [];
    queue = message.guild.queue;
  }
  //Set variables
  let urls = args[0].split(",");
  let replay = args[1];
  for (var url of urls){
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
       queue.push(info);
      })
    }
  }
  //Play queue
  playQueue(client,message);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Music",
  permLevel: 0
};

exports.help = {
  name: 'play',
  description: 'Plays music from a YouTube link',
  usage: 'play <URL>'
};
