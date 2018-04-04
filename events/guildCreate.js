const {postToDefault} = require('../util/postToDefault.js');
module.exports = guild =>{
	postToDefault(client.guilds.get(message.guild.id),`I have joined ${guild.name}`);
};