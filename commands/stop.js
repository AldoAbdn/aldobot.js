exports.run = (client, message, args) => {   
  //Disonnects bot from voice channel, sets currently playing to null
  if (client.voiceConnections.find(val => val.channel.guild.id == message.guild.id)){
    message.guild.end = false;
    client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).disconnect();
    message.guild.currentlyPlaying = null;
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
  name: 'stop',
  description: 'Makes bot leave voice channel, clears queue',
  usage: 'stop'
};