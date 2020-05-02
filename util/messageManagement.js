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
    const messages = await modlog.awaitMessages(m=>true, {limit:10});
    const log = messages.filter(m => m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Case')
    ).first();
    if (!log) return 0;
    const thisCase = /Case\s(\d+)/.exec(log.embeds[0].footer.text);
    return thisCase ? parseInt(thisCase[1]) + 1 : 1;
  }