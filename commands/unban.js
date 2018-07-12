exports.run = async(client, message, args) => {
  //Set variables
  const reason = args.slice(1).join(' ');
  const user = await client.fetchUser(args[0]);
  //Sets reason and unbanner
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  //If no reason, returns
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  //Must pass a user resolvable
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
  //Unbans user
  message.guild.unban(user);
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
