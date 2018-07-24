const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
exports.run = async (client, message, args) => {
    //Set Variables
    let max = parseInt(args[0]);
    let randomInt = 1;
    //Random roll, max is passed
    if (max){
        randomInt = Math.floor(Math.random() * max) + 1;
        message.reply(`You rolled: ${randomInt}`);
    } else if(max <= 1) {
        message.reply(`Ooops! I can only roll for a valid integer that is greater than 1`);
    }else {
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
  usage: 'roll <max (optional)>'
};