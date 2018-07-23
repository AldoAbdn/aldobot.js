const settings = require('../settings.json');
const {embedSan} = require('../util/embedSan.js');
exports.run = async (client, message, args) => {
  //Set variables
  const log = message.guild.channels.find('name', settings.moderationchannel) || message.guild.channels.find('name', settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice[1].join(" ");
  for (var caseNumber of caseNumbers){
    //If there is a moderation channel
    if (log){
      //Fetch last 100 messages
      await log.fetchMessages({limit:100}).then((messages) => {
        //Gets matching case log 
        const caseLog = messages.filter(m => m.author.id === client.user.id &&
          m.embeds[0] &&
          m.embeds[0].type === 'rich' &&
          m.embeds[0].footer &&
          m.embeds[0].footer.text.startsWith('Case') &&
          m.embeds[0].footer.text === `Case ${caseNumber}`
        ).first();
        //Replace parts of message with new reason
        log.fetchMessage(caseLog.id).then(logMsg => {
          const embed = logMsg.embeds[0];
          embedSan(embed);
          let index = embed.description.indexOf("Reason:");
          embed.description = embed.description.substring(0,index+9)+" "+newReason;
          logMsg.edit({embed});
          embed.description = embed.description.replace(`Awaiting moderator's input. Use ${settings.prefix}reason ${caseNumber} <reason>.`, newReason);
          logMsg.edit({embed});
        });
      });
    } 
  }
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'reason',
  description: 'Updates an unset moderator action.',
  usage: 'reason <case number> <new reason>'
};
