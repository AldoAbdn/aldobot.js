const {postToDefault} = require('../util/messageManagement.js');
module.exports = role =>{
	let guild = role.guild;
	postToDefault(guild,`A new role was created`);
};