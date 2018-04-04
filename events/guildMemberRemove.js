const {postToDefault} = require('../util/postToDefault.js');
module.exports = member => {
  const guild = member.guild;
  postToDefault(client.guilds.get(message.guild.id),`Please say goodbye to ${member.user.username} we will miss you!`);
};
