exports.run = async(client, message, args) => {  
    const member = message.mentions.members.first();
    const nickname = args.slice(1).join(" ");
    member.setNickname(nickname);
};
    
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'nickname',
  description: 'Sets a users nickname',
  usage: 'togglerole <user> <nickname>'
};