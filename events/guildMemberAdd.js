const settings = require('../settings.json');
const {postToDefault} = require('../util/postToDefault.js');
module.exports = member => {
	//Welcome message
	let guild = member.guild;
	postToDefault(guild,`Please welcome ${member.user.username} to the server`);
	//Set default role
	let role = member.guild.roles.cache.find(role => role.name === settings.defaultrole);
	member.addRole(role).catch(console.error);
}
