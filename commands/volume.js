exports.run = (client, message, args) => {   
    let volume = parseInt(args[0]);
    console.log(args);
    if (args.length == 0) {
        message.reply("Volume is:" + (client.guilds.get(message.guild.id).dispatcher.volume * 100));
    }
    else if (!Number.isInteger(volume) || volume < 0){
        message.reply("Volume must be an integer between 0 and 100 inclusive");
        return;
    } else if (client.guilds.get(message.guild.id).dispatcher) {
        client.guilds.get(message.guild.id).dispatcher.setVolume((volume/100));
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