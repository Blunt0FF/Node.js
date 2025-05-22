const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'info.txt');
const content = 'Node.js is awesome!';

// Запись в файл
fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
        return console.error('Ошибка при записи файла:', err);
    }
    console.log('Файл "info.txt" успешно создан и записан.');

    // Чтение из файла
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error('Ошибка при чтении файла:', err);
        }
        console.log('Содержимое файла "info.txt":', data);
    });
});