const yt = require('ytdl-core-discord');
const {deleteMessage, postToDefault} = require('./messageManagement.js');
const settings = require('../settings.json');
exports.playQueue = (client,message) => {
  const guild = message.guild;
  const member = message.member;
  if (member.voice.channel) {
      if (guild.lock && !client.connections.find(voiceConnection => voiceConnection === member.voice.connection)){
        return;
      }
      member.voice.channel.join()
        .then(voiceConnection => {
          // Resume
          if (guild.dispatcher) {
            if (guild.dispatcher.paused){
              guild.dispatcher.resume();
            }
            return;
          // Play Next Song
          } else if (guild.queue.length > 0){
            playSong(guild, voiceConnection).catch(error=>console.log('Error'+e));
          // Add Song To Queue
          } else if(guild.currentlyPlaying){
            addToQueue(guild, message);
          } else {
            guild.playing = false;
          }
        })
        .catch(console.error);
    } else {
      message.reply('You need to join a voice channel before play command can be issued').then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
};

async function playSong(guild, voiceConnection){
  guild.lastPlayed = guild.currentlyPlaying;
  guild.currentlyPlaying = guild.queue.shift();
  if (guild.currentlyPlaying!=undefined || guild.currentlyPlaying!=null){
    //Set playing to true on new stream
    guild.playing = true;
    let stream = await yt(guild.currentlyPlaying.video_url, {audioonly: true}, {passes: 5});
    guild.dispatcher = voiceConnection.play(stream,{type:'opus',volume:guild.volume});
    guild.dispatcher.on('end', () => {
      delete guild.dispatcher;
      console.log('Song End');
      //Check for stop event
      if (guild.playing){
        //Delay to fix bug in discord.js 
        setTimeout(()=>{
          exports.playQueue(client,message);
        },1000)
      } 
    });
    guild.dispatcher.on('error', e=>{
      console.log('Error:'+e);
    });     
    postToDefault(guild,`:Now Playing:\n${guild.currentlyPlaying.title}`);
  }
}

function addToQueue(guild, message){
  let url = "https://www.youtube.com/watch?v=" + guild.currentlyPlaying.related_videos[0].id;
  for (let vid of guild.currentlyPlaying.related_videos){
    if (guild.lastPlayed && vid.title != undefined && vid.title != guild.lastPlayed.title){
      if (vid.id){
        url = "https://www.youtube.com/watch?v=" + vid.id;
      } else {
        url = "https://www.youtube.com/watch?v=" + vid.video_id;
      }
      break;
    }
  }
  yt.getInfo(url, function(err, info){
    if (err) {
      message.reply("Invalid URL").then(msg=>deleteMessage(msg,settings.messagetimeout));
    } else {
      guild.queue.push(info);
      exports.playQueue(client,message);
    }
  });
}

exports.createQueueString = (queue) => {
  let str = ":Current Queue:\n";
  queue.forEach(video => {
      str += video.title + "\n";
  });
  return str;
};