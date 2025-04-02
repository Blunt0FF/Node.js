const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', () => {
    console.log('Обработчик 1');
});

emitter.on('event', () => {
    console.log('Обработчик 2');
});

emitter.emit('event');


