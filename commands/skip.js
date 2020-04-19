const {deleteMessage} = require('../util/messageManagement.js');
exports.run = (client, message, args, perms, settings) => {
  const voiceChannel = message.member.voice.channel;
  const guild = message.guild;

  //If not in voice channel, return
  if (!client.voice.connections.find(voiceConnection => voiceConnection.channel.id == voiceChannel.id))
    return;
  }
  //If no queue, set it
  if (!guild.queue){
    guild.queue = [];
  }
  //Get passed in index
  let index = parseInt(args[0]);
  //If a valid index passed in, skip it from current queue
  if (index > 0 && index <= guild.queue.length){
    guild.queue.splice(index-1,1);
  } else if(index < 0 || index > guild.queue.length){
    //Index invalid
    message.reply("Invalid Index").then(msg=>deleteMessage(msg,settings.messagetimeout));
  } else if(guild.dispatcher){
    //If no index passed, skip current playing song
    guild.dispatcher.end();
  } else {
    //No music
    message.reply("Not Currently Playing Music").then(msg=>deleteMessage(msg,settings.messagetimeout));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Music",
  permLevel: 0
};

exports.help = {
  name: 'skip',
  description: 'Skips a song. Pass a track index to remove a track in the queue, or leave blank to skip the current song',
  usage: 'skip <track index (Optional)>'
};
