var db = require('rethinkdb');
var chalk = require('chalk');
module.exports = function addGuildXP(msg, map, Discord, client){
    if(map.indexOf(msg.author.id) == -1){
        map.push(msg.author.id);
        db.db('Audius').table('Servers').get(msg.guild.id).run(global.conn, (err, result) => {
            if(err)console.log(chalk.red(err));
            if(result == null){
                db.db('Audius').table('Servers').insert({
                    id: msg.guild.id,
                    serverName: msg.guild.name.toString(),
                    ownerid: msg.guild.owner.id,
                    ownerName: msg.guild.owner.user.username.toString(),
                    iconUrl: msg.guild.iconURL(),
                    Users: {}
                }).run(global.conn, (err, result) => {
                    if(err)console.log(chalk.red(err));
                    if(result)console.log(chalk.grey('[' + chalk.cyan('DB') + ']Added Guild to database: ' + chalk.cyan(msg.guild.name.toString())));
                });
            }else{
               //UPDATE GUILD USER LEVEL

            }
        });
      }
}