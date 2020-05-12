module.exports = async function skip(msg, Discord, client, servers, audius, skips){
    if(msg.member.voice.channel != null && (msg.member.voice.channelID == msg.guild.voice.channelID)){
    if(servers[msg.guild.id]){
        var server = servers[msg.guild.id];
        if (server.dispatcher){
            if(!skips[msg.guild.id]){
                skips[msg.guild.id] = {skips: 1}; 
                var skipcount = skips[msg.guild.id]
                embed = new Discord.MessageEmbed()
  .setTitle("Audius.co")
  .setAuthor("SKIP REQUESTED", client.user.avatarURL())
  .setColor(0xdc00ff)
  .setDescription("Audius is a blockchain based music streaming service.")
  .setThumbnail(client.user.avatarURL())
  .setTimestamp()
  .setURL("https://Audius.co/")
  .addField('‌‌ ',
  '**' + 'SKIP INFO:' + '**' + `\n` + '*' + msg.author.tag + ' has voted to skip. **' + skipcount.skips + '** / **' + parseInt(msg.member.voice.channel.members.size/2) + '**' + '*')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});
              }else{
                const trackId = server.queue[0].split('-').pop();
                const metadata = await audius.getTrackMetadata(trackId)
                if(skipcount.skips >= parseInt(msg.member.voice.channel.members.size/2)){
                    server.dispatcher.end();
                    embed = new Discord.MessageEmbed()
  .setTitle("Audius.co")
  .setAuthor("SKIP REQUESTED", client.user.avatarURL())
  .setColor(0xdc00ff)
  .setDescription("Audius is a blockchain based music streaming service.")
  .setThumbnail(client.user.avatarURL())
  .setTimestamp()
  .setURL("https://Audius.co/")
  .addField('‌‌ ',
  '**' + 'SKIP INFO:' + '**' + `\n` + '*' + metadata.title + ' has been skipped.' + '*')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});
                }else{
                    skipcount.skips = skipcount.skips+1;
                    embed = new Discord.MessageEmbed()
  .setTitle("Audius.co")
  .setAuthor("SKIP REQUESTED", client.user.avatarURL())
  .setColor(0xdc00ff)
  .setDescription("Audius is a blockchain based music streaming service.")
  .setThumbnail(client.user.avatarURL())
  .setTimestamp()
  .setURL("https://Audius.co/")
  .addField('‌‌ ',
  '**' + 'SKIP INFO:' + '**' + `\n` + '*' + msg.author.tag + ' has voted to skip. **' + skipcount.skips + '** / **' + parseInt(msg.member.voice.channel.members.size/2) + '**' + '*')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});
                    
                }
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
  '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'Im not playing anything in this server.' + '*')
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
  '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'Im not playing anything in this server.' + '*')
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
  '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'You must be in the same voice channel as the bot to do this.' + '*')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});
}




    
}