// Создайте новый файл с именем `once_handler.js`.
// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// Зарегистрируйте обработчик для события `event` с использованием метода `once`.
// Сгенерируйте событие `event` и убедитесь, что обработчик вызывается.
// Снова сгенерируйте событие `event` и убедитесь, что обработчик больше не вызывается, так как он был одноразовым.

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.once('event', () => console.log(
"Событие сгенерировано"));

emitter.emit('event');
emitter.emit('event');