const db = require('rethinkdb');
const chalk = require('chalk');
module.exports = function level(msg, Discord, client){
    db.db('Audius').table('Users').get(msg.author.id).run(global.conn, (err, result) => {
        if(err)console.log(chalk.red(err));
        if(result){
            embed = new Discord.MessageEmbed()
                .setAuthor("LEVEL REQUEST")
                .setColor(0x00fff7)
                .setTimestamp()
                .addField('‌‌ ',
                '**' + msg.author.username.toString() + '**' + `\n` + '*⮞ Level: **' + result.level + '** \n' + ' ⮞ XP: **' + result.xp + '** \n' + ' ⮞ XPNeeded: **' + result.xpNeeded + '**' + '*')
                .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
            msg.channel.send({embed});
        }
    });
}