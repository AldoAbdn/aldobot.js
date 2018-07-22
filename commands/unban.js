exports.run = async(client, message, args) => {
  //Set variables
  const reason = args.slice(1).join(' ');
  var userids = args[0].split(",");
  var users = [];
  const guild = message.guild;
  for (var userid of userids){
    users.append(await client.fetchUser(userid));
  }
  //Sets reason and unbanne
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  //If no reason, returns
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    for (var user in users){
    //Must pass a user resolvable
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    //Unbans user
    guild.unban(user);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban <ID> <reason>'
};
