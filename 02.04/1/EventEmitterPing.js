const EventEmitter = require('events');

// Создаём экземпляр EventEmitter
const emitter = new EventEmitter();

// Обработчик события 'ping' с помощью on
const onPingHandler = () => {
    console.log('Обработчик on: Событие ping произошло');
};
emitter.on('ping', onPingHandler);

// Обработчик события 'ping' с помощью once
emitter.once('ping', () => {
    console.log('Обработчик once: Событие ping произошло');
});

// Вызываем событие 'ping' два раза
console.log('Первый вызов события ping:');
emitter.emit('ping');
console.log('Второй вызов события ping:');
emitter.emit('ping');

// Удаляем обработчик onPingHandler вручную
emitter.off('ping', onPingHandler);

// Снова вызываем событие 'ping'
console.log('Третий вызов события ping:');
emitter.emit('ping');