exports.run = (client, message, args) => {
  const guild = message.guild;
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  }
  if (!guild.queue){
    guild.queue = [];
  }
  let index = parseInt(args[0]);
  if (index > 0 && index <= guild.queue.length){
    guild.queue.splice(index-1,1);
  } else if(index < 0 || index > guild.queue.length){
    message.reply("Invalid Index");
  } else if(guild.dispatcher){
    guild.dispatcher.end();
  } else {
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
