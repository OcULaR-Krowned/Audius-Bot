module.exports = function(msg, Discord, client, command, args, config) {
   embed = new Discord.MessageEmbed()
  .setTitle("Audius.co")
  .setAuthor("HELP REQUESTED", client.user.avatarURL())
  .setColor(0xdc00ff)
  .setDescription("Audius is a blockchain based music streaming service.")
  .setThumbnail(client.user.avatarURL())
  .setTimestamp()
  .setURL("https://Audius.co/")
  .addField('‌‌ ',
  '**' + 'HELP SENT :white_check_mark:' + '**' + `\n` + 'Help has been sent to: ' + msg.author.tag)
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});



embed = new Discord.MessageEmbed()
  .setTitle("Audius.co")
  .setAuthor("HELP MENU", client.user.avatarURL())
  .setColor(0xdc00ff)
  .setDescription("Audius is a blockchain based music streaming service.")
  .setThumbnail(client.user.avatarURL())
  .setTimestamp()
  .setURL("https://Audius.co/")
  .addField('‌‌ ',
  '**' + config.prefix + 'help' + '**' + `\n` + 'Pulls up this general help menu.')
  .addField('‌‌ ',
  '**' + config.prefix + 'info [@User]' + '**' + `\n` + 'Gives you info on the mentioned user.')
  .addField('‌‌ ',
  '**' + config.prefix + 'ping' + '**' + `\n` + 'Get the ping in MS for how well the bot is connected.')
  .addField('‌‌ ',
  '**' + config.prefix + 'status' + '**' + `\n` + 'Get the status of the bot like RAM, Servers, Users etc.')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.author.send({embed});
}