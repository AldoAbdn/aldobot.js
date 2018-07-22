exports.run = (client, message, args) => {
  //Set variables
  const log = message.guild.channels.find('name', settings.supportlog) || message.guild.channels.find("name", settings.defaultchannel);
  var supportticket;
  const caseNumbers = args[0].split(",");
  var logs;
  var caselog;
  for (var caseNumber of caseNumbers){
    //Get support ticket channel 
    supportticket = message.guild.channels.find("name","support-ticket-"+caseNumber);
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
            let index = embed.description.indexof("Status:");
            embed.description = embed.description.splice(0,index+7)+"COMPLETED";
            logMsg.edit({embed});
          });
        });
      }
    }
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
  name: 'completesupportticket',
  description: 'Completes a support ticket',
  usage: 'completesupportticket <case>'
};