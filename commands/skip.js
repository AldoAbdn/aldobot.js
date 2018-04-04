exports.run = (client, message, args) => {
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  }
  if (!client.guilds.get(message.guild.id).queue){
    client.guilds.get(message.guild.id).queue = [];
  }
  let index = parseInt(args[0]);
  if (index > 0 && index <= client.guilds.get(message.guild.id).queue.length){
    client.guilds.get(message.guild.id).queue.splice(index-1,1);
  } else if(index < 0 || index > client.guilds.get(message.guild.id).queue.length){
    message.reply("Invalid Index");
  } else if(client.guilds.get(message.guild.id).dispatcher){
  	  client.guilds.get(message.guild.id).dispatcher.end();
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
