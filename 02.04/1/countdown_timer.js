// Создайте новый файл с именем `countdown_timer.js`.
// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// Напишите функцию `countdown`, которая принимает количество секунд и объект `EventEmitter`.
// Внутри функции `countdown` используйте `setInterval`, чтобы каждую секунду генерировать событие `tick` с текущим оставшимся временем.
// Когда таймер достигнет нуля, генерируйте событие `end` и остановите интервал.
// Зарегистрируйте обработчики для событий `tick` и `end`, чтобы выводить сообщения в консоль.
// Вызовите функцию `countdown` с начальным временем и вашим объектом `EventEmitter`.

const EventEmitter = require('events');
const emitter = new EventEmitter();

const countdown = (seconds) => {
    let remainingTime = seconds;
    const interval = setInterval(() => {
        emitter.emit('tick', remainingTime); 
        remainingTime--;

        if (remainingTime < 0) {
            emitter.emit('end'); 
            clearInterval(interval); 
        }
    }, 1000);
}

emitter.on('tick', (remainingTime) => {
    console.log(`Оставшееся время: ${remainingTime} секунд`);
});

emitter.on('end', () => {
    console.log('Таймер завершен!');
});

countdown(5);