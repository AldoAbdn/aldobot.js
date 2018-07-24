const {embedSan} = require('../util/embedSan.js');
exports.updateEmbedField = async (channels,authorID,caseNumber,field,newValue) => {
  for (var channel of channels){
    //If channel is valid
    if (channel){
      //Fetch last 100 messages
      await channel.fetchMessages({limit:100}).then((messages) => {
        //Gets matching case log 
        caseLog = messages.filter(m => m.author.id === authorID &&
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
          let index = embed.description.indexOf(field);
          let firstHalf = embed.description.substring(0,index+field.length);
          let secondHalf = embed.description.substring(index+field.length+1);
          let endIndex = secondHalf.indexOf("**");
          if (endIndex != -1){
            secondHalf = secondHalf.substring(endIndex);
          } else {
            secondHalf = "";
          }
          embed.description = firstHalf+" "+newValue+secondHalf;
          logMsg.edit({embed});
        });
      });
    }
  } 
}
