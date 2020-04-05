const {updateEmbedField} = require('../util/updateEmbedField.js');
exports.run = async (client, message, args, perms, settings) => {
  //Set variables
  const channels = message.guild.channels;
  const log = channels.cache.find(channel=>channel ===  settings.supportchannel) || channels.cache.find(channel => channel.name === settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice(1).join(" ");
  const query = "**Status:**";
  var supportticket;
  var logs;
  var caseLog;
  for (var caseNumber of caseNumbers){
    supportticket = message.guild.channels.cache.find(channel => channel.name === "support-ticket-"+caseNumber);
    logs = [log,supportticket];
    updateEmbedField(logs,client.user.id,caseNumber,query,newReason);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Customer Support",
  permLevel: 3
};

exports.help = {
  name: 'status',
  description: 'Updates a support tickets status',
  usage: 'status <case> <update>'
};