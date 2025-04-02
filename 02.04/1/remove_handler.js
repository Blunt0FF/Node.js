// Создайте новый файл с именем `remove_handler.js`.
// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// Определите функцию-обработчик, которая будет регистрироваться для события `event`.
// Зарегистрируйте этот обработчик для события `event`.
// Сгенерируйте событие `event` и убедитесь, что обработчик вызывается.
// Удалите зарегистрированный обработчик для события `event`.
// Снова сгенерируйте событие `event` и убедитесь, что обработчик больше не вызывается.

const EventEmitter = require('events');
const emitter = new EventEmitter();

const eventHandler = () => {
    console.log('Обработчик: Событие сгенерировано!');
    emitter.off('event', eventHandler);
}

emitter.on('event', eventHandler);
emitter.emit('event');
emitter.emit('event');
