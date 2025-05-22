const EventEmitter = require('events');
const emitter = new EventEmitter();

const firstHandler = (data) => {
    console.log('First handler:', data);
};

const secondHandler = (data) => {
    console.log('Second handler:', data);
};

emitter.on('myEvent', firstHandler);

emitter.on('myEvent', secondHandler);

// Удаление второго обработчика
emitter.removeListener('myEvent', secondHandler);

// Генерация события
emitter.emit('myEvent', 'Testing');