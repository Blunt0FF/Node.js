const EventEmitter = require('events');
const emitter = new EventEmitter();

// Регистрация одноразового обработчика события
emitter.once('oneTimeEvent', () => {
console.log('This will be logged only once');
});

// Генерация события несколько раз
emitter.emit('oneTimeEvent');
emitter.emit('oneTimeEvent');