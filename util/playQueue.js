const yt = require('ytdl-core');
const {postToDefault} = require('../util/postToDefault.js');
exports.playQueue = (client,message) => {
  const guild = message.guild;
    if (message.member.voiceChannel) {
        if (guild.lock && !client.voiceConnections.find("channel",message.member.voiceChannel)){
          return;
        }
        message.member.voiceChannel.join()
          .then(connection => {
            console.log("connected");
            if (guild.dispatcher) {
              
              if (guild.dispatcher.paused){
                guild.dispatcher.resume();
              }
              return;
            } else if (guild.queue.length > 0){
              console.log(guild.queue.length);
              guild.lastPlayed = guild.currentlyPlaying;
              guild.currentlyPlaying = guild.queue.shift();
              console.log(guild.queue.length);
              if (guild.currentlyPlaying!=undefined || guild.currentlyPlaying!=null){
                console.log('Played');
                if (guild.dispatcher!=undefined){
                  delete guild.dispatcher;
                }
                guild.playing = true;
                guild.dispatcher = connection.playStream(yt(guild.currentlyPlaying.video_url, {audioonly: true}, {passes: 5}),{volume:guild.volume});
                guild.dispatcher.on('end', () => {
                  delete guild.dispatcher;
                  if (guild.playing){
                    setTimeout(()=>{
                      exports.playQueue(client,message);
                    },1000)
                  }
                });
                guild.dispatcher.on('error', e=>{
                  console.log('Error:'+e);
                 });
                guild.dispatcher.on('debug', info=>{
                  console.log('Debug:' +info);
                });      
                postToDefault(guild,`:Now Playing:\n${guild.currentlyPlaying.title}`);
              }
              return;
            } else if(guild.currentlyPlaying){
              console.log('currentPlaying');
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
                  message.reply("Invalid URL");
                }
                guild.queue.push(info);
                exports.playQueue(client,message);
              });
            }
          })
          .catch(console.error);
      } else {
        message.reply('You need to join a voice channel before play command can be issued');
      }
};