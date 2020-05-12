var db = require('rethinkdb');
var chalk = require('chalk');
module.exports = function addXP(msg, map, Discord, client){
    if(map.indexOf(msg.author.id) == -1){
        map.push(msg.author.id);
        db.db('Audius').table('Users').get(msg.author.id).run(global.conn, (err, result) => {
            if(err)console.log(chalk.red(err));
            if(result == null){
                db.db('Audius').table('Users').insert({
                    id: msg.author.id,
                    username: msg.author.username.toString(),
                    avatarUrl: msg.author.avatarURL(),
                    messages: 1,
                    level: 1,
                    xp: 10,
                    xpNeeded: 60
                }).run(global.conn, (err, result) => {
                    if(err)console.log(chalk.red(err));
                    if(result)console.log(chalk.grey('[' + chalk.cyan('DB') + ']Added user to database: ' + chalk.cyan(msg.author.username.toString())));
                });
            }else{

                var newAvatar = msg.author.avatarURL();
                var newMessages = result.messages+1;
                var newLevel;
                var newXp;
                var newXpNeeded;

                if(result.xp+10 >= result.xpNeeded){
                    newLevel = result.level+1;
                    newXp = 0;
                    newXpNeeded = parseInt(result.xpNeeded*1.3);

                    embed = new Discord.MessageEmbed()
                        .setAuthor("LEVEL UP")
                        .setColor(0xdc00ff)
                        .setTimestamp()
                        .addField('‌‌ ',
                        '**' + ':partying_face: CONGRATS :partying_face:' + '**' + `\n` + '*' + msg.author.username.toString() + ' Leveled up to level: **' + newLevel + '**' + '*')
                        .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
                      
                        
                        msg.channel.send({embed});
                }else{
                    newLevel = result.level;
                    newXp = result.xp+10;
                    newXpNeeded = result.xpNeeded;
                }
                db.db('Audius').table('Users').get(msg.author.id).update({
                    avatarUrl: newAvatar,
                    messages: newMessages,
                    level: newLevel,
                    xp: newXp,
                    xpNeeded: newXpNeeded
                }).run(global.conn, (err, result) => {
                    if(err)console.log(chalk.red(err));
                    if(result){
                        console.log(chalk.grey('[' + chalk.cyan('DB') + ']Added ' + chalk.cyan('10xp') + ' to user: ' +  chalk.cyan(msg.author.username.toString())));
                    }
                });
            }
        });
      }
}