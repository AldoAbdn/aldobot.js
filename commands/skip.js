exports.run = (client, message, args) => {
  //If not in voice channel, return
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  }
  //If no queue, set it
  if (!message.guild.queue){
    message.guild.queue = [];
  }
  //Get passed in index
  let index = parseInt(args[0]);
  //If a valid index passed in, skip it from current queue
  if (index > 0 && index <= message.guild.queue.length){
    message.guild.queue.splice(index-1,1);
  } else if(index < 0 || index > message.guild.queue.length){
    //Index invalid
    message.reply("Invalid Index");
  } else if(message.guild.dispatcher){
    //If no index passed, skip current playing song
    message.guild.dispatcher.end();
  } else {
    //No music
    message.reply("Not Currently Playing Music");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'skip',
  description: 'Skips a song. Pass a track index to remove a track in the queue, or leave blank to skip the current song',
  usage: 'skip <track index (Optional)>'
};
