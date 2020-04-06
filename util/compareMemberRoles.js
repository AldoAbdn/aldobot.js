const {deleteMessage} = require('../util/messageManagement.js');
exports.compareMemberRoles = (callingMember, mentionedMember, message) => {
  if (callingMember.id === mentionedMember.id) {
    message.channel.send('You cannot do that to yourself, why did you try?').then(msg=>deleteMessage(msg,settings.messagetimeout));
    return false;
  } else if (mentionedMember) {
    if (mentionedMember.roles.highest.position >= callingMember.roles.highest.position) {
      message.channel.send('The targeted member has a higher or equal role position than you.').then(msg=>deleteMessage(msg,settings.messagetimeout));
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
