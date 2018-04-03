exports.run = (client, message) => {
    message.reply(`:Now Playing:\n${client.guilds.get(message.guild.id).currentlyPlaying.title}`,{code:'asciidoc'});
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'playing',
    description: 'Shows currently playing song',
    usage: 'playing'
};