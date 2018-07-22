module.exports = channel => {
	console.log(`A ${channel.type} by the name of ${channel.name} with the ID of ${channel.id} was created`);
	if (channel.type === 'text'){
		channel.send('New Channel Created');
	}	
};