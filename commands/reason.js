const {updateEmbedField} = require('../util/embed.js');
exports.run = async (client, message, args, perms, settings) => {
  //Set variables
  const log = message.guild.channels.cache.find(channel=>channel.name ===  settings.moderationchannel) || message.guild.channels.cache.find(channel=>channel.name ===  settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice(1).join(" ");
  const query = "**Reason:**";
  for (var caseNumber of caseNumbers){
    updateEmbedField([log],client.user.id,caseNumber,query,newReason);
  }
};

exports.conf = {
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'reason',
  description: 'Updates an unset moderator action.',
  usage: 'reason <case number> <new reason>'
};
