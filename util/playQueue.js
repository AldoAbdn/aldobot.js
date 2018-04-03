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
              client.guilds.get(message.guild.id).dispatcher = connection.playStream(yt(client.guilds.get(message.guild.id).currentlyPlaying.video_url, {audioonly: true}, {passes: 5}));
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
            } else {
              return;
            }
          })
          .catch(console.error);
      } else {
        message.reply('You need to join a voice channel before play command can be issued');
      }
};