const settings = require('../settings.json');
module.exports = member => {
	//Welcome message
	let guild = member.guild;
	guild.defaultChannel.sendMessage(`Please welcome ${member.user.username} to the server`);
	//Set default role
	let role = member.guild.roles.find("name", settings.defaultrole);
	member.addRole("Pleb");
}
