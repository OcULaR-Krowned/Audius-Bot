module.exports = async function play(msg, Discord, client, args, audius){
    const fs = require('fs');
    if(msg.member.voice.channel){
        const connection = await msg.member.voice.channel.join();
        const dispatcher;

const trackId = args[0]
try {
  const metadata = await audius.getTrackMetadata(trackId)
  console.log(metadata.title)
} catch (err) {
    console.log(err);
}

try {
  const url = await audius.getAudioStreamURL(trackId)

  dispatcher = connection.play(url);
} catch (err) {
    console.log(err);
}

        //const dispatcher = connection.play(fs.createReadStream(__dirname + '/audio.mp3'));

dispatcher.on('start', () => {
	console.log('audio.mp3 is now playing!');
});

dispatcher.on('finish', () => {
	console.log('audio.mp3 has finished playing!');
});

// Always remember to handle errors appropriately!
dispatcher.on('error', console.error);
    }else{
        msg.channel.send('You must be in a voice channel to use this command.');
    }
}