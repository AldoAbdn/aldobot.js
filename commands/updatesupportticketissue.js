const settings = require('../settings.json');
const {embedSan} = require('../util/embedSan.js');
exports.run = async (client, message, args) => {
  //Set variables
  const channels = message.guild.channels;
  const log = channels.find('name', settings.supportchannel) || message.guild.channels.find("name", settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice(1).join(" ");
  var supportticket;
  var logs;
  var caseLog;
  for (var caseNumber of caseNumbers){
    supportticket = channels.find("name", "support-ticket-"+caseNumber);
    logs = [log,supportticket];
    for (var channel of logs){
      //If channel is valid
      if (channel){
        //Fetch last 100 messages
        await channel.fetchMessages({limit:100}).then((messages) => {
          //Gets matching case log 
          caseLog = messages.filter(m => m.author.id === client.user.id &&
            m.embeds[0] &&
            m.embeds[0].type === 'rich' &&
            m.embeds[0].footer &&
            m.embeds[0].footer.text.startsWith('Case') &&
            m.embeds[0].footer.text === `Case ${caseNumber}`
          ).first();
          //Replace parts of message with new reason
          channel.fetchMessage(caseLog.id).then(logMsg => {
            let embed = logMsg.embeds[0];
            embedSan(embed);
            embed.description = embed.description.replace(`Awaiting moderator's input. Use ${settings.prefix}updatesupportticketissue ${caseNum} <issue>.`, newReason);
            logMsg.edit({embed});
          });
        });
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'updatesupportticketissue',
  description: 'Updates a support ticket issue',
  usage: 'updatesupportticketissue <case> <update>'
};