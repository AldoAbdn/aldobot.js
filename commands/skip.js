exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel
  var queue = message.guild.queue;
  var dispatcher = message.guild.dispatcher;
  //If not in voice channel, return
  if (!client.voiceConnections.find("channel",voiceChannel)){
    return;
  }
  //If no queue, set it
  if (!queue){
    queue = [];
  }
  //Get passed in index
  let index = parseInt(args[0]);
  //If a valid index passed in, skip it from current queue
  if (index > 0 && index <= queue.length){
    message.guild.queue.splice(index-1,1);
  } else if(index < 0 || index > queue.length){
    //Index invalid
    message.reply("Invalid Index");
  } else if(dispatcher){
    //If no index passed, skip current playing song
    dispatcher.end();
  } else {
    //No music
    message.reply("Not Currently Playing Music");
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
