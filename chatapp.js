const client = new tmi.Client({
	channels: [ 'loltyler1' ]
});

client.connect();

var chatlog = {};

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	// console.log(`${tags['display-name']}: ${message}`);
	chatlog = chatlog + `${tags['display-name']}: ${message}` + "\n";
	document.getElementById("chatbox").innerText = chatlog;
});