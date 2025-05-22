// Создайте новый файл с именем `user_state.js`.
// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// Напишите функцию `changeUserState`, которая принимает новый статус и объект `EventEmitter`.
// Внутри функции `changeUserState` генерируйте событие `stateChange` с переданным статусом.
// Зарегистрируйте обработчики для события `stateChange`, чтобы выводить новый статус в консоль.
// Вызовите функцию `changeUserState` несколько раз с разными статусами.

const EventEmitter = require('events');
const emitter = new EventEmitter();

function changeUserState(newState, emitter) {
    emitter.emit('stateChange', newState)
}

emitter.on('stateChange', (state) => {
    console.log('New user status', state);
})

changeUserState('online', emitter)
changeUserState('away', emitter)
changeUserState('offline', emitter)
changeUserState('drunk', emitter)
