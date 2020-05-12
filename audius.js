const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
var os = require('os-utils');
const config = require('./config.json');
const Audius = require('@audius/audius.js');
const db = require('rethinkdb');

const audius = new Audius({
  /* Give this client a descriptive ID describing this application. */
  analyticsId: 'audius_discord_bot'
})

//GENERAL COMMANDS
const help = require('./BOT/commands/general/help.js');
const info = require('./BOT/commands/general/info.js');
const ping = require('./BOT/commands/general/ping.js');
const status = require('./BOT/commands/general/status.js');

//MUSIC COMMANDS
const play = require('./BOT/commands/music/play.js');
const stop = require('./BOT/commands/music/stop.js');
const skip = require('./BOT/commands/music/skip.js');

//LEVEL ADDING
const addXP = require('./BOT/levels/addXP.js');
const addGuildXP = require('./BOT/levels/addGuildXP.js');

//LEVEL COMMANDS
const leaderboard = require('./BOT/levels/leaderboard.js');
const level = require('./BOT/levels/level.js');

//DATABASE COMMANDS


const setPresence = require('./BOT/onReady/setPresence.js');






client.on('ready', () => {
  setInterval(() => {
    setPresence(client, config);
  }, 30000);
  console.log(chalk.grey('[' + chalk.green('ONLINE') + ']Logged in as: ' + chalk.green(client.user.tag)));
  db.connect({ 
    host: 'localhost', 
    port: '28015', 
    db: 'Audius', 
    table: 'Users'}
, function(err, conn) {
    global.conn = conn;
    if(err)console.log(chalk.red(err));
    console.log(chalk.grey('[' + chalk.cyan('DB') + ']Logged in to Database: ' + chalk.cyan(conn.db) + ' Address: ' + chalk.cyan(conn.host + ':' + conn.port)));
});
});


var mapUser = [];
var mapGuild = [];

setInterval(() => {
  mapUser = [];
  mapGuil = [];
}, 60000);

var servers = {};


client.on('message', msg => {
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(msg.author != client.user){
    if(!(msg.channel instanceof Discord.DMChannel)){


      //LEVELS
      addXP(msg, mapUser, Discord, client);
      addGuildXP(msg, mapGuild, Discord, client);




      switch(msg.content.toLocaleLowerCase().split(' ')[0]) {

        //GENERAL COMMANDS
        case config.prefix + 'help':
            help(msg, Discord, client, command, args, config);
          break;
        case config.prefix + 'info':
            info(msg, Discord, client, config);
          break;
        case config.prefix + 'ping':
            ping(msg, Discord, client);
          break;
          case config.prefix + 'status':
            status(msg, Discord, client, os);
          break;

          //MUSIC COMMANDS
          case config.prefix + 'play':
            play(msg, Discord, client, args, audius, servers);
          break;

          case config.prefix + 'stop':
            stop(msg, Discord, client, args, servers);
          break;

          case config.prefix + 'skip':
            skip(msg, Discord, client, servers, audius);
          break;

          //LEVEL COMMANDS

          case config.prefix + 'leaderboard':
              leaderboard(msg, Discord, client);
          break;

          case config.prefix + 'level':
              level(msg, Discord, client);
          break;


          

          //DATABASE COMMANDS
    }
    } 
  }
});

client.login(config.token);