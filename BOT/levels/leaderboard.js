const db = require('rethinkdb');
const chalk = require('chalk');
module.exports = function leaderboard(msg, Discord, client){
    db.db('Audius').table('Users').orderBy(db.desc('level')).limit(10).run(global.conn, (err, result) => {
        if(err)console.log(chalk.red(err));
        if(result){

            var leaderboard = [];

            for(i = 0; i<10; i++){
                var emoji;
                switch(i) {
                    case 0:emoji = ':first_place:';
                    break;
                    case 1:emoji = ':second_place:';
                    break;
                    case 2:emoji = ':third_place:';
                    break;
                    case 3:emoji = ':four:';
                    break;
                    case 4:emoji = ':five:';
                    break;
                    case 5:emoji = ':six:';
                    break;
                    case 6:emoji = ':seven:';
                    break;
                    case 7:emoji = ':eight:';
                    break;
                    case 8:emoji = ':nine:';
                    break;
                    case 9:emoji = ':keycap_ten:';
                    break;
                    default:emoji = '';
                }
                if(result[i]){
                    leaderboard.push(emoji + ' ⮞ **' + result[i].username + '** \n Level: **' + result[i].level + '**' + ' ⮞ XP: **' + result[i].xp + '** ⮞ XPNeeded: **' + result[i].xpNeeded + '**')
                }
            }

            embed = new Discord.MessageEmbed()
                        .setAuthor("GLOBAL LEADERBOARD")
                        .setColor(0x00fff7)
                        .setDescription('*This is a **GLOBAL** leaderboard \n that shows you who has the \n highest level out of all the \n servers that **' + client.user.tag + '** is in!*')
                        .setTimestamp()
                        .addField('‌‌ ',
                        '**' + 'HIGHEST LEVELS GLOBALLY' + '**' + `\n` + leaderboard.join('\n \n').toString())
                        .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
                      
                        
                        msg.channel.send({embed});
        }
    })
}