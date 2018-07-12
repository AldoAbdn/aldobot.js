module.exports = role =>{
	let guild = role.guild;
	postToDefault(guild,`A new role called ${role.name} was deleted`);
};