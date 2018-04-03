module.exports = channel => {
	console.log(`A ${channel.type} by the name of ${channel.name} with the ID of ${channel.id} was deleted`);
	channel.guild.defaultChannel.sendMessage(`The ${channel.name} ${channel.type} channel was deleted`);	
};