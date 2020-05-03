const settings = require('../settings.json');
exports.deleteMessage = (message,timeout)=>{
    if(typeof timeout === 'string' || timeout instanceof String){
        timeout = parseInt(timeout);
    }
    else if(timeout!=null || !isNaN(timeout)){
        message.delete({timeout});
    } else {
        console.log("Failed to delete message: " + message);
    }
}

exports.postToDefault = (guild,string) => {
    const defaultChannel = guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
    if (defaultChannel){
        defaultChannel.send(string,{code:'asciidoc'}).then(msg=>exports.deleteMessage(msg, settings.messagetimeout));
        return true;
    } else {
        return false;
    }
};

exports.compareMemberRoles = (callingMember, mentionedMember, message) => {
    if (callingMember.id === mentionedMember.id) {
      message.reply('You cannot do that to yourself, why did you try?').then(msg=>exports.deleteMessage(msg,settings.messagetimeout));
      return false;
    } else if (mentionedMember) {
      if (mentionedMember.roles.highest.position >= callingMember.roles.highest.position) {
        message.reply('The targeted member has a higher or equal role position than you.').then(msg=>exports.deleteMessage(msg,settings.messagetimeout));
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

exports.caseNumber = async (client, modlog) => {
  // Get's the latest log
  const supportTickets = await modlog.messages.fetch({limit:10});
  const supportTicket = supportTickets.filter(m => 
    m.author.id === client.user.id &&
    m.embeds[0] &&
    m.embeds[0].type === 'rich' &&
    m.embeds[0].footer &&
    m.embeds[0].footer.text.startsWith('Case')).first();
  // Returns the next case number
  if(supportTicket) {
    const thisCase = /Case\s(\d+)/.exec(supportTicket.embeds[0].footer.text);
    return thisCase ? parseInt(thisCase[1]) + 1 : 1;
  } else 
    return 1;
}