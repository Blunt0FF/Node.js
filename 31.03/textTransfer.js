// Создайте скрипт, который читает текст из файла source.txt и записывает его в новый файл copy.txt.

// Сначала считываем файл source. ReadFile
// Потом записываем файл copy.txt. WriteFile

const fs = require('fs');

fs.writeFile('source.txt', 'Тут был текст', (err) => {
    if (err) 
        return console.error('Ошибка при создании файла:', err);
    console.log('Файл source.txt создан.');

    fs.readFile('source.txt', 'utf8', (err, data) => {
        if (err) 
            return console.error('Ошибка при чтении файла:', err);

        fs.writeFile('copy.txt', data, (err) => {
            if (err) 
                return console.error('Ошибка при записи файла:', err);
            console.log('Файл copy.txt создан.');
        });
        fs.unlink('copy.txt', (err) => {
            if (err) 
                return console.error('Ошибка при удалении файла:', err);
            console.log('Файл copy.txt удален.');
        });
    });

});