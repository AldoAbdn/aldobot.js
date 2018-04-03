exports.run = (client, message, args) => {   
    if (client.voiceConnections.find(val => val.channel.guild.id == message.guild.id)){
      client.voiceConnections.find(val => val.channel.guild.id == message.guild.id).disconnect();
    }
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stop',
  description: 'Makes bot leave voice channel, clears queue',
  usage: 'stop'
};