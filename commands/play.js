const {playQueue} = require('../util/playQueue.js');
const yt = require('ytdl-core');
exports.run = async(client, message, args) => {
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
  let urls = [];
  if (args[0]){
    urls = args[0].split(",");
  }
  for (var url of urls){
    //If url, get YT info and add to queue 
    if (url) {
      //Get YT info
      let info = await yt.getInfo(url);
        //Push YT to queue
        if (info != null){
          queue.push(info);
        }
    }
  }
  message.guild.end = true;
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
