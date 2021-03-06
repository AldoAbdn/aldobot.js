//https://github.com/agubelu/discord-music-bot/blob/master/musicbot.js
//https://github.com/fent/node-ytdl-core/blob/master/README.md

/*
	Based on An Idiot's Guide: Discord.js tutorial
	Found here: https://github.com/AnIdiotsGuide/Tutorial-Bot/tree/master
*/

/*
Imports, and initial setup function
*/
async function setup(){
  const fs = require('fs');
  const settings = require('./settings');
  const Discord = require('discord.js');
  const DBHelper = require('./util/db.js');
  const client = new Discord.Client({ useUnifiedTopology: true });
  const moment = require('moment');
  require('./util/eventLoader')(client);
  
  const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };

  //DB Setup
  let dbhelper = DBHelper.DBHelper;
  await dbhelper.connect();
  client.DBHelper = dbhelper;

  //Commands setup
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
      const props = require(`./commands/${f}`);
      log(`Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  
  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        const cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  
  client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification*/
    let permlvl = 0;
    const mod_role = message.guild.roles.cache.find(role => role.name === settings.modrolename);
    if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 2;
    const admin_role = message.guild.roles.cache.find(role => role.name === settings.adminrolename);
    if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 3;
    if (message.author.id === process.env.OWNER_ID) permlvl = 4;
    return permlvl;
  };
  
  //Login
  //Replace process.env.TOKEN with your own bot token 
  client.login(process.env.TOKEN);
}
//Call setup function
setup();



