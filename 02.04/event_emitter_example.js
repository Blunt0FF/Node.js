const EventEmitter = require('events');
const emitter = new EventEmitter();

// Регистрация обработчика события

emitter.on('myEvent', () => {
    console.log('Событие произошло!');
});

// Генерация события
emitter.emit('myEvent');