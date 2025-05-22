const fs = require("fs")

function logMessage(content) {

    fs.appendFile('log.txt', content + '\n', (err) => {
        if (err) {
            return console.error('Ошибка при записи в файл:', err);
        }
        console.log('Лог записан:', content);
    });
}

module.exports = { logMessage };