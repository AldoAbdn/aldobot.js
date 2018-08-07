exports.compareMemberRoles = (callingMember, mentionedMember) => {
  if (callingMember.id === mentionedMember.id) {
    message.channel.send('You cannot do that to yourself, why did you try?');
    return false;
  } else if (mentionedMember) {
    if (mentionedMember.highestRole.position >= callingMemberhighestRole.position) {
      message.channel.send('The targeted member has a higher or equal role position than you.');
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
