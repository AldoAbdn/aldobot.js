const {updateEmbedField} = require('../util/updateEmbedField.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Set variables
  const log = message.guild.channels.find('name', settings.supportchannel) || message.guild.channels.find("name", settings.defaultchannel);
  var supportticket;
  const caseNumbers = args[0].split(",");
  const query = "**Status:**";
  var logs;
  var caselog;
  for (var caseNumber of caseNumbers){
    //Get support ticket channel 
    supportticket = message.guild.channels.find("name","support-ticket-"+caseNumber);
    logs = [log,supportticket];
    updateEmbedField(logs,client.user.id,caseNumber,query,"COMPLETED");
    //Delete support channel 
    supportticket.delete("Completed");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'completeticket',
  description: 'Completes a support ticket',
  usage: 'completeticket <case>'
};