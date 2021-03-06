exports.run = (client, message, args) => {   
  //Variables
  const guild = message.guild; 
  //Disonnects bot from voice channel, sets currently playing to null
  const voiceChannel = client.voice.connections.find(connection => connection.channel.guild.id === guild.id);
  if (voiceChannel){
    //Stop playQueue firing on end event
    guild.playing = false;
    //End Dispatcher
    if(guild.dispatcher)
      guild.dispatcher.end();
    client.user.setActivity("");
    //Disconnects voice channel
    voiceChannel.disconnect();
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