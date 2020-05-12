module.exports = function stop(msg, Discord, client, servers){

    if(msg.guild.voice){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            msg.guild.voice.connection.disconnect();
            embed = new Discord.MessageEmbed()
      .setTitle("Audius.co")
      .setAuthor("DISCONNECT REQUESTED", client.user.avatarURL())
      .setColor(0xdc00ff)
      .setDescription("Audius is a blockchain based music streaming service.")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setURL("https://Audius.co/")
      .addField('‌‌ ',
      '**' + 'DISCONNECTED BY:' + '**' + `\n` + '*' + msg.author.tag + '*')
      .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
    
      
      msg.channel.send({embed});
        }else{
            embed = new Discord.MessageEmbed()
      .setTitle("Audius.co")
      .setAuthor("ERROR", client.user.avatarURL())
      .setColor(0xdc00ff)
      .setDescription("Audius is a blockchain based music streaming service.")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setURL("https://Audius.co/")
      .addField('‌‌ ',
      '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'You dont have permission to do this.' + '*')
      .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
    
      
      msg.channel.send({embed});
        }
    }else{
        embed = new Discord.MessageEmbed()
      .setTitle("Audius.co")
      .setAuthor("ERROR", client.user.avatarURL())
      .setColor(0xdc00ff)
      .setDescription("Audius is a blockchain based music streaming service.")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setURL("https://Audius.co/")
      .addField('‌‌ ',
      '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'Im not currently in a voice channel.' + '*')
      .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());
    
      
      msg.channel.send({embed});
    }
}