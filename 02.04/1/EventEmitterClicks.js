// Создай EventEmitter, который регистрирует событие 'log' и выводит в консоль сообщение, переданное как аргумент.
// Создай событие 'warning', которое обрабатывается с помощью once.
// Симулируй клики мыши.
// Создай обработчик события 'click', который считает и выводит количество кликов.
// Дополнительно: После 5 кликов отключи обработчик с помощью off.
// Рекомендации по кликеру. Создать начальный Стейт, который будете увеличивать count ++, так же нужна проверка, что если счетчик больше или равен 5 , то отключаем его (emmiter.off(handlerToRemove))
// Рекомендую всю логику делать в слушателе
// Симулировать клики можно через цикл например

const EventEmitter = require('events');
const emitter = new EventEmitter();

// 1. Регистрируем событие 'log'
emitter.on('log', (message) => {
    console.log('info: ', message);
});

// 2. Регистрируем событие 'warning' (используем once)
emitter.once('warning', (message) => {
    console.warn('warning: ', message);
});

// 3. Обработчик кликов
let clickCount = 0;
const clickHandler = () => {
    clickCount++;
    console.log('click: ', clickCount);
    
    if (clickCount >= 5) {
        emitter.off('click', clickHandler);
        console.log('click handler removed');
    }
};

emitter.on('click', clickHandler);

// Симуляция кликов
for (let i = 0; i < 7; i++) {
    emitter.emit('click');
}

// Вызов событий
emitter.emit('log', 'This is a log message');
emitter.emit('warning', 'This is a warning');
// Второй вызов 'warning' не сработает, так как обработчик срабатывает один раз
emitter.emit('warning', 'This warning will not be logged');
