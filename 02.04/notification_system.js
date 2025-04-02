// Создайте новый файл с именем `notification_system.js`.
// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// Напишите функцию `sendNotification`, которая принимает сообщение и объект `EventEmitter`.
// Внутри функции `sendNotification` генерируйте событие `notification` с переданным сообщением.
// Зарегистрируйте несколько обработчиков для события `notification`, например, один для логирования в консоль, другой для записи в файл.
// Вызовите функцию `sendNotification` несколько раз с разными сообщениями.

const EventEmitter = require('events');
const emitter = new EventEmitter();
const fs = require('fs');

function sendNotification(mes, emitter) {
    emitter.emit("notification", mes);
  }

function logToConsole(str) {
    console.log('New notification:', str);   
}

function logToFile(str) {
    fs.appendFile('Notifications.txt', str + '\n', (err) => {
        if (err) {
            console.error('Error while writing file');
        }
        console.log('Text is successfully written');
        
    })
}

emitter.on('notification', logToConsole)
emitter.on('notification', logToFile)

sendNotification("text1", emitter);
sendNotification("text228", emitter);
sendNotification("text1488", emitter);