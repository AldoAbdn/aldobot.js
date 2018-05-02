const yt = require('ytdl-core');
const {postToDefault} = require('../util/postToDefault.js');
exports.playQueue = (client,message) => {
    if (message.member.voiceChannel) {
        if (client.guilds.get(message.guild.id).lock && !client.voiceConnections.find("channel",message.member.voiceChannel)){
          return;
        }
        message.member.voiceChannel.join()
          .then(connection => {
            if (client.guilds.get(message.guild.id).dispatcher) {
              if (client.guilds.get(message.guild.id).dispatcher.paused){
                client.guilds.get(message.guild.id).dispatcher.resume();
              }
              return;
            } else if (client.guilds.get(message.guild.id).queue.length > 0){
              client.guilds.get(message.guild.id).currentlyPlaying = client.guilds.get(message.guild.id).queue.shift();
              if (client.guilds.get(message.guild.id).currentlyPlaying){
                client.guilds.get(message.guild.id).dispatcher = connection.playStream(yt(client.guilds.get(message.guild.id).currentlyPlaying.video_url, {audioonly: true}, {passes: 5}),{volume:client.guilds.get(message.guild.id).volume});
                client.guilds.get(message.guild.id).dispatcher.on('end', () => {
                  delete client.guilds.get(message.guild.id).dispatcher;
                  exports.playQueue(client, message, [null,true]);
                });
                client.guilds.get(message.guild.id).dispatcher.on('error', e=>{
                  console.log('Error:'+e);
                 });
                client.guilds.get(message.guild.id).dispatcher.on('debug', info=>{
                  console.log('Debug:' +info);
                });      
                postToDefault(client.guilds.get(message.guild.id),`:Now Playing:\n${client.guilds.get(message.guild.id).currentlyPlaying.title}`);
              }
            } else if(client.guilds.get(message.guild.id).currentlyPlaying){
              console.log(Object.keys(client.guilds.get(message.guild.id).currentlyPlaying));
              let url = "https://www.youtube.com/watch?v=" + client.guilds.get(message.guild.id).currentlyPlaying.related_videos[0].id;
              yt.getInfo(url, function(err, info){
                if (err) {
                  message.reply("Invalid URL");
                }
                client.guilds.get(message.guild.id).queue.push(info);
                console.log(info)
                exports.playQueue(client,message);
              });
            }
          })
          .catch(console.error);
      } else {
        message.reply('You need to join a voice channel before play command can be issued');
      }
};