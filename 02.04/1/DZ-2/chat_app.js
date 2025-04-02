const EventEmitter = require('events');
const emitter = new EventEmitter();

function sendMessage(username, message) {
    emitter.emit('message', { username, message });
}

emitter.on('message', (data) => {
    console.log(`${data.username}: ${data.message}`);
});

sendMessage('Alice', 'Привет всем! Я потерялась в зазеркалье')
sendMessage('Cat', '@Alice бывает')