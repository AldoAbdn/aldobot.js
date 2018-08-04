exports.parseUser = (message, user) => {
  const member = message.guild.member(user) || null;
  if (user.id === message.author.id) {
    message.channel.send('You cannot do that to yourself, why did you try?');
    return false;
  } else if (member) {
    if (member.highestRole.position >= message.member.highestRole.position) {
      message.channel.send('The targeted member has a higher or equal role position than you.');
      return false;
    }
  }
  return true;
};
