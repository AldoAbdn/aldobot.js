exports.run = (client, message, args) => {   
    const guild = message.guild;
    let volume = parseInt(args[0]);
    if (guild.volume == null){
        guild.volume = 1;
    }
    if (args.length == 0) {
        message.reply("Volume is:" + (guild.volume * 100));
    }
    else if (!Number.isInteger(volume) || volume < 0){
        message.reply("Volume must be an integer between 0 and 100 inclusive");
        return;
    } else if (guild.dispatcher) {
        guild.volume = volume/100;
        guild.dispatcher.setVolume(guild.volume);
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