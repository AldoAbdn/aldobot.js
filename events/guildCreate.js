const {postToDefault} = require('../util/messageManagement.js');
module.exports = guild =>{
	postToDefault(guild,`I have joined ${guild.name}`);
};