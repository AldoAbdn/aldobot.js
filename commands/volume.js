exports.run = (client, message, args) => {   
    let volume = parseInt(args[0]);
    if (args.length == 0) {
        message.reply("Volume is:" + (client.guilds.get(message.guild.id).volume * 100));
    }
    else if (!Number.isInteger(volume) || volume < 0){
        message.reply("Volume must be an integer between 0 and 100 inclusive");
        return;
    } else if (client.guilds.get(message.guild.id).dispatcher) {
        client.guilds.get(message.guild.id).volume = volume/100;
        client.guilds.get(message.guild.id).dispatcher.setVolume(clients.guilds.get(message.guild.id).volume);
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'volume',
    description: 'Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume',
    usage: 'volume <volume (optional)>'
};