const {postToDefault} = require('../util/postToDefault.js');
module.exports = channel => {
	postToDefault(client.guilds.get(message.guild.id),`The ${channel.name} ${channel.type} channel was deleted`);		
};