const {postToDefault} = require('../util/postToDefault.js');
module.exports = channel => {
	console.log(`A ${channel.type} by the name of ${channel.name} with the ID of ${channel.id} was created`);
	if (channel.type === 'text'){
		channel.sendMessage('New Channel Created');
	}
	postToDefault(client.guilds.get(message.guild.id),`The ${channel.name} ${channel.type} channel was created`);	
};