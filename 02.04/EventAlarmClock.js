const EventEmitter = require('events');

// Создаём экземпляр EventEmitter
const alarmClock = new EventEmitter();

// Регистрация обработчика на событие 'wakeUp'
function regularWakeUpHandler() {
    console.log("Пора вставать!");
}
alarmClock.on('wakeUp', regularWakeUpHandler);

// Регистрация одноразового обработчика на событие 'wakeUp'
alarmClock.once('wakeUp', () => {
    console.log("Доброе утро, только сегодня я скажу это один раз!");
});

// Срабатывание будильника три раза
alarmClock.emit('wakeUp'); // Первый раз
alarmClock.emit('wakeUp'); // Второй раз

// Отключение обычного обработчика
alarmClock.off('wakeUp', regularWakeUpHandler);

alarmClock.emit('wakeUp'); // Третий раз (ничего не должно выводиться)