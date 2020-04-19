const {playQueue} = require('../util/music.js');
const yt = require('ytdl-core-discord');
exports.run = async(client, message, args) => {
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
          message.guild.queue.push(info);
        }
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
