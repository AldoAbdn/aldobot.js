const {updateEmbedField} = require('../util/embed.js');
exports.run = async (client, message, args, perms, settings) => {
  //Set variables
  const channels = message.guild.channels.cache;
  const log = channels.find(channel => channel.name === settings.supportchannel) || channels.find(channel => channel.name === settings.defaultchannel);
  if(args[0] == null || args[0] == '')
    return message.reply('You must specify at least one case number');
  const caseNumbers = args[0].split(",");
  const query = "**Status:**";
  var supportticket;
  var logs;
  for (var caseNumber of caseNumbers){
    //Get support ticket channel 
    supportticket = channels.find(channel => channel.name === "support-ticket-"+caseNumber);
    // Update Log
    logs = [log];
    updateEmbedField(logs,client.user.id,caseNumber,query,"COMPLETED");
    //Delete support channel 
    supportticket.delete("Completed");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["complete"],
  category: "Customer Support",
  permLevel: 3
};

exports.help = {
  name: 'completeticket',
  description: 'Completes a support ticket',
  usage: 'completeticket <case>'
};