exports.updateEmbedField = async (channels,authorID,caseNumber,field,newValue) => {
  for (var channel of channels){
    //If channel is valid
    if (channel){
        //Gets matching case log 
        const caseLogs = await channel.messages.fetch({limit:10});
        const caseLog = caseLogs.filter(m => m.author.id === authorID &&
          m.embeds[0] &&
          m.embeds[0].type === 'rich' &&
          m.embeds[0].footer &&
          m.embeds[0].footer.text.startsWith('Case') &&
          m.embeds[0].footer.text === `Case ${caseNumber}`
        ).first();
        //Replace parts of message with new reason
        let embed = caseLog.embeds[0];
        exports.embedSan(embed);
        let index = embed.description.indexOf(field);
        let firstHalf = embed.description.substring(0,index+field.length);
        let secondHalf = embed.description.substring(index+field.length+1);
        let endIndex = secondHalf.indexOf("**");
        if (endIndex != -1){
          secondHalf = secondHalf.substring(endIndex);
        } else {
          secondHalf = "";
        }
        embed.description = firstHalf+" "+newValue+"\n"+secondHalf;
        caseLog.edit({embed});
    }
  } 
}

exports.embedSan = async (embed) => {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
  return embed;
}
