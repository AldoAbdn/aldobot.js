const {playQueue, createQueueString} = require('../util/music.js');
const {isURL} = require('../util/string.js');
const yt = require('ytdl-core-discord');
const ytSearch = require('youtube-search');
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
  if (args[0] && args.length == 1 && isURL(args[0])){
    let url = args[0];
    //Get YT info
    let info = await yt.getInfo(url);
    //Push YT to queue
    if (info != null){
      message.guild.queue.push(info);
      message.reply(createQueueString(message.guild.queue),{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
  } else if(args.length > 0){
    let query = args.join(" ");
    let options = {
      maxResults: 1,
      key: process.env.YT_API_KEY
    };
    let {results} = await ytSearch(query, options);
    console.log(results);
    console.log(args);
    console.log(isURL(args[0]));
    if(results != null){
      let video = results[0];
      let url = video.link;
      let info = await yt.getInfo(url);
      //Push YT to queue
      if (info != null){
        message.guild.queue.push(info);
        message.reply(createQueueString(guild.queue),{code:'asciidoc'});
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
  description: 'Plays music from a YouTube link or search',
  usage: 'play <URL> / play <SEARCH>'
};
