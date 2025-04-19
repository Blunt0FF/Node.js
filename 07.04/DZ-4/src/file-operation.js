require('dotenv').config({ path: '../.env' })
const fs = require('fs');
const path = require('path');

const fileName = process.env.FILENAME;
const filePath = path.join(__dirname, fileName);
const content = 'Привет! Это текст, записанный в файл через fs и dotenv.';

fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
        return console.error('Ошибка при записи файла:', err);
    }
    console.log(`Файл "${fileName}" успешно создан.`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error('Ошибка при чтении файла:', err);
        }
        console.log(`Содержимое файла "${fileName}":\n${data}`);
    });
});