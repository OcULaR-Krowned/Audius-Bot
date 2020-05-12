module.exports = async function play(msg, Discord, client, args, audius, servers){
  if(!servers[msg.guild.id]){
    servers[msg.guild.id] = {queue: []}; 
  };
  var server = servers[msg.guild.id];
  
if(args[0] && args[0].toLocaleLowerCase().includes('https://audius.co/')){
    if(msg.member.voice.channel != null){
      if(!msg.guild.voice){
        const connection = await msg.member.voice.channel.join();
        global.connection = connection;
        server.queue.push(args[0]);
        playTrack(msg, Discord, client, server, audius, connection);
        server.queue.shift();
      }else{
        if(msg.member.voice.channelID == msg.guild.voice.channelID){
          server.queue.push(args[0]);
        const metadata2 = await audius.getTrackMetadata(args[0].split('-').pop())

        embed = new Discord.MessageEmbed()
        .setTitle("Audius.co")
        .setAuthor("ADDED TO QUEUE", client.user.avatarURL())
        .setColor(0xdc00ff)
        .setDescription("Audius is a blockchain based music streaming service.")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setURL("https://Audius.co/")
        .addField('‌‌ ',
        '**' + 'SONG ADDED:' + '**' + `\n` + '*' + metadata2.title + '*')
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
      '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'You must be in the same voice channel as the bot to add to the queue.' + '*')
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
      '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'You must be in a voice channel to use that command.' + '*')
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
  '**' + ':x: ERROR OCCURED:' + '**' + `\n` + '*' + 'Must provide a link to an audius song. Ex: https://audius.co/' + '*')
  .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

  
  msg.channel.send({embed});
}

if(server.dispatcher){
  /*server.dispatcher.on('start', async () => {
    
  });*/
  
  server.dispatcher.on('finish', () => {
    if(server.queue[0] != null){
      playTrack(msg, Discord, client, server, audius, global.connection);
    }else{
      connection.disconnect();
    }
  });
  
  // Always remember to handle errors appropriately!
  server.dispatcher.on('error', () => {
      console.log(error);
  });
}
}



async function playTrack(msg, Discord, client, server, audius, connection) {

  const trackId = server.queue[0].split('-').pop();
  const url = await audius.getAudioStreamURL(trackId)
  const metadata = await audius.getTrackMetadata(trackId)
  console.log('123');
  // Pass it off to a Discord client - fun!
  server.dispatcher = connection.play(url);

    embed = new Discord.MessageEmbed()
        .setTitle("Audius.co")
        .setAuthor("NOW PLAYING", client.user.avatarURL())
        .setColor(0xdc00ff)
        .setDescription("Audius is a blockchain based music streaming service.")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setURL("https://Audius.co/")
        .addField('‌‌ ',
        '**' + 'NOW PLAYING:' + '**' + `\n` + '*' + metadata.title + '*')
        .setFooter("Sent by: " + client.user.tag, client.user.avatarURL());

        msg.channel.send({embed});

        server.queue.shift();

}















