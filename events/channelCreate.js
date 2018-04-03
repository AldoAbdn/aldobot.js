module.exports = channel => {
	console.log(`A ${channel.type} by the name of ${channel.name} with the ID of ${channel.id} was created`);
	if (channel.type === 'text'){
		channel.sendMessage('You were successfull in creating this channel');
	}
	channel.guild.defaultChannel.sendMessage(`The ${channel.name} ${channel.type} channel was created`);	
};