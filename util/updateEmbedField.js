exports.updateEmbedField = async (channels,caseNumber,field,newValue) => {
  for (var channel of channels){
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
          let index = embed.description.indexof(field);
          embed.description = embed.description.substring(0,index+field.length)+" "+newValue;
          logMsg.edit({embed});
        });
      });
    }
  } 
}
