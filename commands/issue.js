const {updateEmbedField} = require('../util/embed.js');
exports.run = async (client, message, args, perms, settings) => {
  //Set variables
  const channels = message.guild.channels.cache;
  const log = channels.find(channel => channel.name === settings.supportchannel) || guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice(1).join(" ");
  const query = "**Issue:**";
  var supportticket;
  var logs;
  for (var caseNumber of caseNumbers){
    supportticket = channels.find(channel => channel.name === "support-ticket-"+caseNumber);
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
  name: 'issue',
  description: 'Updates a support ticket issue',
  usage: 'issue <case> <update>'
};