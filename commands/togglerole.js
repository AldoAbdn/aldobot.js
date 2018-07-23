exports.run = async(client, message, args) => {
  //Set variables
  const members = message.mentions.members.array();
  const role = message.mentions.roles.first();
  const guild = message.guild;
  for(var member of members){
    //Toggle role
    if (member.roles.find("id",role.id)){
      //Removes roll
      member.removeRole(role).catch(console.error);
    } else {
      //Add role      
      member.addRole(role).catch(console.error);
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