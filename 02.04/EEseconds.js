// Делаем счетчик так же как и в симулятор кликов
// В listener инкрементируем каунт и пишем сообщение мол прошла секунда
// Далее спустя 3 секунды генерим событие done, для этого реализуем проверку
// Регаем событие done, там может быть какой то текст внутри о выполнении
// Генерим событие спустя 3 секунды

const EventEmitter = require('events');
const emitter = new EventEmitter();

let seconds = 0;

const doneHandler = (message) => {
    console.log('таймер', message);
    // Удаляем обработчик после его выполнения
    emitter.off('done', doneHandler);
};

const secCounter = setInterval(() => {
    seconds++
    console.log('Прошло секунд: ', seconds);
    
    if (seconds >=3){
        emitter.emit('done', 'всё!') 
        clearInterval(secCounter)
    }
}, 1000)

emitter.on('done', doneHandler)