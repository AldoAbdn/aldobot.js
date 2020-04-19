const {postToDefault} = require('../util/messageManagement.js');
module.exports = member => {
  const guild = member.guild;
  postToDefault(guild,`Please say goodbye to ${member.user.username} we will miss you!`);
};
