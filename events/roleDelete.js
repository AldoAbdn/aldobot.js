module.exports = role =>{
	let guild = role.guild;
	postToDefault(client.guilds.get(message.guild.id),`A new role called ${role.name} was deleted`);
};