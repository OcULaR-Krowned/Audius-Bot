const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
var os = require('os-utils');
const config = require('./config.json');



//GENERAL COMMANDS
const help = require('./BOT/commands/general/help.js');
const info = require('./BOT/commands/general/info.js');
const ping = require('./BOT/commands/general/ping.js');
const status = require('./BOT/commands/general/status.js');

const setPresence = require('./BOT/onReady/setPresence.js');


client.on('ready', () => {
  setInterval(() => {
    setPresence(client, config);
  }, 5000);
  console.log(chalk.grey('[' + chalk.green('ONLINE') + ']Logged in as: ' + chalk.green(client.user.tag)));
});

client.on('message', msg => {
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(msg.author != client.user){
    switch(command) {
      case 'help':
          help(msg, Discord, client, command, args, config);
        break;
      case 'info':
          info(msg, Discord, client, config);
        break;
      case 'ping':
          ping(msg, Discord, client);
        break;
      case 'status':
          status(msg, Discord, client, os);
        break;
    } 
  }
});

client.login(config.token);