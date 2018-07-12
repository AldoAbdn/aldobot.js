const settings = require('../settings.json');

async function embedSan(embed) {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
  return embed;
}

exports.run = async (client, message, args) => {
  //Set variables
  const modlog = client.channels.find('name', 'mod-log');
  const caseNumber = args.shift();
  const newReason = args.join(' ');
  //If there is a moderation channel
  if (client.channels.find("name",settings.moderationchannel)){
    //Fetch last 100 messages
    await client.channels.find("name",settings.moderationchannel).fetchMessages({limit:100}).then((messages) => {
      //Gets matching case log 
      const caseLog = messages.filter(m => m.author.id === client.user.id &&
        m.embeds[0] &&
        m.embeds[0].type === 'rich' &&
        m.embeds[0].footer &&
        m.embeds[0].footer.text.startsWith('Case') &&
        m.embeds[0].footer.text === `Case ${caseNumber}`
      ).first();
      //Replace parts of message with new reason
      client.channels.find("name",settings.moderationchannel).fetchMessage(caseLog.id).then(logMsg => {
        const embed = logMsg.embeds[0];
        embedSan(embed);
        embed.description = embed.description.replace(`Awaiting moderator's input. Use ${settings.prefix}reason ${caseNumber} <reason>.`, newReason);
        logMsg.edit({embed});
      });
    });
  } else if (client.channels.find("name",settings.defaultchannel)){
    //If no moderation channel, get default channel
    //Get matching case log
    await client.channels.find("name",settings.defaultchannel).fetchMessages({limit:100}).then((messages) => {
      const caseLog = messages.filter(m => m.author.id === client.user.id &&
        m.embeds[0] &&
        m.embeds[0].type === 'rich' &&
        m.embeds[0].footer &&
        m.embeds[0].footer.text.startsWith('Case') &&
        m.embeds[0].footer.text === `Case ${caseNumber}`
      ).first();
      //Replace parts of message with new reason
      client.channels.find("name",settings.defaultchannel).fetchMessage(caseLog.id).then(logMsg => {
        const embed = logMsg.embeds[0];
        embedSan(embed);
        embed.description = embed.description.replace(`Awaiting moderator's input. Use ${settings.prefix}reason ${caseNumber} <reason>.`, newReason);
        logMsg.edit({embed});
      });
    });
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
