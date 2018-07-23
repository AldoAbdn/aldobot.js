exports.run = async(client, message, args) => {
  //Set variables
  const users = message.mentions.users;
  const role = message.mentions.role[0];
  const guild = message.guild;
  var guildMember;
  for (var user of users){
    guildMember = guild.fetchMember(user);
    //Toggle role
    if (guildMember.roles.has(role)) {
      //Removes roll
      guildMember.removeRole(role).catch(console.error);
    } else {
      //Add role      
      guildMember.addRole(role).catch(console.error);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'togglerole',
  description: 'toggles a given role on a user',
  usage: 'togglerole <user> <role>'
};