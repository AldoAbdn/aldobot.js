const {deleteMessage} = require('../util/messageManagement.js');
exports.run = async(client, message, args, perms, settings) => {
  //Set variables
  const reason = args.slice(1).join(' ');
  var userids = args[0].split(",");
  var users = [];
  const guild = message.guild;
  for (var userid of userids){
    users.push(await client.fetchUser(userid));
  }
  //Sets reason and unbanne
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  //If no reason, returns
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.').then(msg=>deleteMessage(msg,settings.messagetimeout));
  for (var user of users){
    //Must pass a user resolvable
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
    //Unbans user
    guild.unban(user);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban <ID> <reason>'
};
