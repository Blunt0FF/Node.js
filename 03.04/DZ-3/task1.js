const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'myFolder');

// Создание каталога
fs.mkdir(folderPath, (err) => {
    if (err) {
        return console.error('Ошибка при создании каталога:', err);
    }
    console.log('Каталог "myFolder" успешно создан.');

    // Удаление каталога
    fs.rmdir(folderPath, (err) => {
        if (err) {
            return console.error('Ошибка при удалении каталога:', err);
        }
        console.log('Каталог "myFolder" успешно удалён.');
    });
});