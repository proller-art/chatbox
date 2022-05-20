const client = new tmi.Client({
	channels: [ 'Proller' ]
});

client.connect();

var chatStack = [];

client.on('message', (channel, tags, message, self) => {
	//chatStack = chatStack + `${tags['display-name']}: ${message}` + "\n";
	const chatMessage = {tags: tags, message: message};
	//chatStack.push(chatMessage);
	updateChat(chatStack, chatMessage);
	printChat(chatStack, "chatbox");
});


function updateChat(chat, message) {
	chat.push(message);
	if (chat.length > 5) {
		chat.shift();
	}
}

function printChat(chat, id) {
	var result = "";
	for (var i = 0; i < chat.length; i++) {
		if (chat[i].tags.subscriber == true) {
			result = result + '<div class="chatMessage"><div class="chatNameSub">' + `${chat[i].tags['display-name']}` + '</div>' + `${formatEmotes(chat[i].message, chat[i].tags.emotes)}` + "</div>";
		} else {
			result = result + '<div class="chatMessage"><div class="chatName">' + `${chat[i].tags['display-name']}` + '</div>' + `${formatEmotes(chat[i].message, chat[i].tags.emotes)}` + "</div>";
		}
	}
	document.getElementById(id).innerHTML = result;
}

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
				splitText.splice(mote[0], 1, '<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v2/' + i + '/default/dark/1.0">');
			}
		}
	}
	return splitText.join('');
}
