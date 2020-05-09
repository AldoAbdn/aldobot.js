const yt = require('ytdl-core-discord');
const {deleteMessage, postToDefault} = require('./messageManagement.js');
const settings = require('../settings.json');
exports.playQueue = (client,message) => {
  const guild = message.guild;
  const member = message.member;
  const voiceConnection = client.voice.connections.find(voiceconnection => voiceconnection.channel.guild === message.guild);
  if(voiceConnection){
    handleCommand(guild, client, message, settings, voiceConnection);
  } else if(member.voice.channel) { 
      member.voice.channel.join()
        .then(voiceConnection => {
          handleCommand(guild, client, message, settings, voiceConnection);
        })
        .catch(console.error);
  } else {
    message.reply('You need to join a voice channel before play command can be issued').then(msg=>deleteMessage(msg,settings.messagetimeout));
  }
};

function handleCommand(guild, client, message, settings, voiceConnection){
  // Resume
  if (guild.dispatcher) {
    if (guild.dispatcher.paused){
      guild.dispatcher.resume();
    }
    return;
  // Play Next Song
  } else if (guild.queue.length > 0){
    playSong(client, message, guild, voiceConnection).catch(error=>console.log('Error'+error));
  // Add Song To Queue
  } else if(guild.playing){
    playRelatedVideos(client, guild, message, settings);
  } else {
    guild.playing = false;
  }
}

async function playSong(client, message, guild, voiceConnection){
  guild.currentlyPlaying = guild.queue.shift();
  if (guild.currentlyPlaying!=undefined || guild.currentlyPlaying!=null){
    //Set playing to true on new stream
    guild.playing = true;
    let stream = await yt(guild.currentlyPlaying.video_url, {audioonly: true}, {passes: 5});
    guild.dispatcher = voiceConnection.play(stream,{type:'opus',volume:guild.volume});
    client.user.setActivity(guild.currentPlaying.title);
    guild.dispatcher.on('finish', () => {
      console.log('song finish');
      if(guild.dispatcher){
        delete guild.dispatcher;
      }
      guild.lastPlayed = guild.currentlyPlaying;
      guild.currentlyPlaying = null;
      client.user.setActivity("");
      //Check for stop event
      if (guild.playing){
        //Delay to fix bug in discord.js 
        setTimeout(()=>{
          exports.playQueue(client,message);
          console.log('end');
        },1000)
      } 
    });
    guild.dispatcher.on('error', e=>{
      console.log('Error:'+e);
    });     
    postToDefault(guild,`:Now Playing:\n${guild.currentlyPlaying.title}`);
  }
}

function playRelatedVideos(client, guild, message, settings){
  let url = "https://www.youtube.com/watch?v=" + guild.lastPlayed.related_videos[0].id || guild.lastPlayed.related_videos[0].video_id;
  console.log(url);
  yt.getInfo(url).then(info=>{
    console.log(info);
      guild.queue.push(info);
      if(message.guild.currentPlaying){
        message.reply(createQueueString(message.guild.queue),{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));
      } else {
        message.reply(`:Now Playing:\n${info.title}`,{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));   
      }
      exports.playQueue(client,message);
    }).catch(error=>{
        message.reply(error).then(msg=>deleteMessage(msg,settings.messagetimeout));
    });
}

exports.createQueueString = (queue) => {
  let str = ":Current Queue:\n";
  queue.forEach(video => {
      str += video.title + "\n";
  });
  return str;
};