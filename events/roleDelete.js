module.exports = role =>{
	let guild = role.guild;
	guild.defaultChannel.sendMessage(`A new role called ${role.name} was deleted`);
};