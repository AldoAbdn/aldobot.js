exports.run = (client, message) => {
    if (message.guild.currentlyPlaying){
        message.reply(`:Now Playing:\n${client.guilds.get(message.guild.id).currentlyPlaying.title}`,{code:'asciidoc'});   
    } else {
        message.reply("Not Currently Playing Music");
    }
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