exports.run = async (client, message, args) => {
  const guild = message.guild;
  //If no lock, bot isn't in a voice channel yet
  if (guild.lock == null){
      return;
  } 
  //Check if user is in same channel as bot
  if(client.voiceConnections.find("channel",message.member.voiceChannel)){
    //Toggles lock
    guild.lock = !guild.lock;
    message.reply(server.lock ? 'Bot Locked' : 'Bot Unlocked');
  } else {
    //You have to be in same channel
    message.reply("Must be in the same voice channel as the bot to lock it in a voice channel");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'lock',
  description: 'Locks bot to its current voice channel',
  usage: 'lock'
};
