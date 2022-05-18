const client = new tmi.Client({
	channels: [ 'loltyler1' ]
});

client.connect();

//var chatlog = {};

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	// console.log(`${tags['display-name']}: ${message}`);
	//chatlog.push(formatEmotes(message, tags.emotes));
	document.getElementById("chatbox").innerText= formatEmotes(message, tags.emotes);
});

function formatEmotes(text, emotes) {
	var splitText = text.split('');
	for(var i in emotes) {
		var e = emotes[i];
		for(var j in e) {
			var mote = e[j];
			if(typeof mote == 'string') {
				mote = mote.split('-');
				mote = [parseInt(mote[0]), parseInt(mote[1])];
				var length =  mote[1] - mote[0],
					empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
				splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
				splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">');
			}
		}
	}
	return splitText.join('');
}
