const {updateEmbedField} = require('../util/updateEmbedField.js');
const settings = require('../settings.json');
const {embedSan} = require('../util/embedSan.js');
exports.run = async (client, message, args) => {
  //Set variables
  const channels = message.guild.channels;
  const log = channels.find('name', settings.supportchannel) || channels.find("name", settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice(1).join(" ");
  const query = "**Status:**";
  var supportticket;
  var logs;
  var caseLog;
  for (var caseNumber of caseNumbers){
    supportticket = channels.find("name","support-ticket-"+caseNumber);
    logs = [log,supportticket];
    updateEmbedField(logs,client.user.id,caseNumber,query,newReason);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'status',
  description: 'Updates a support tickets status',
  usage: 'status <case> <update>'
};