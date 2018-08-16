exports.run = async (client, message, args) => {
    //Set Variables
    let max = parseInt(args[0]);
    let multiplier = parseInt(args[1]);
    let randomInts = []
    //Random roll, max is passed
    if(max <= 1) {
        message.reply(`Ooops! I can only roll for a valid integer that is greater than 1`);
    }
    else if (max){
        if(multiplier == null || isNaN(multiplier)){
            multiplier = 1
        } else if (multiplier < 0){
            message.reply("Invalid Multiplier");
            return;
        }
        for (var i = 0;i < multiplier;i++){
            randomInts.push(Math.floor(Math.random() * max) + 1);
        }
        message.reply(`You rolled: ${randomInts.join(",")} Total:${randomInts.reduce((first,second)=>first+second,0)}`);
    } else {
        randomInt = Math.floor(Math.random() * 20) + 1;
        message.reply(`You rolled: ${randomInt}`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Just for Fun",
  permLevel: 0
};

exports.help = {
  name: 'roll',
  description: 'Rolls a random number between 1 and the passed value. If no option specified rolls d20',
  usage: 'roll <max (optional)> <multiplier (optional)>'
};