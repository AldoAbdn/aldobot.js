exports.run = async(client, message, args) => {
  //Set variables
  const members = message.mentions.members.array();
  const userRole = message.mentions.roles.first();
  for(var member of members){
    //Toggle role
    if (member.roles.cache.find(role => role.id === userRole.id)){
      //Removes roll
      member.roles.remove(userRole).catch(console.error);
    } else {
      //Add role      
      member.roles.add(userRole).catch(console.error);
    }
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
  name: 'togglerole',
  description: 'toggles a given role on a user',
  usage: 'togglerole <user> <role>'
};