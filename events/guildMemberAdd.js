const settings = require('../settings.json');
const {postToDefault} = require('../util/messageManagement.js');
module.exports = member => {
	//Welcome message
	let guild = member.guild;
	postToDefault(guild,`Please welcome ${member.user.username} to the server`);
	//Set default role
	let role = member.guild.roles.cache.find(role => role.name === settings.defaultrole);
	member.roles.add(role).catch(console.error);
}
