
// Импортируйте необходимые модули в ваш скрипт:
// Модуль `fs` для работы с файловой системой.
// Модуль `path` для работы с путями файлов и каталогов.

// Определите путь к исходному файлу:
// В данном примере используйте файл изображения `example.jpg`, который должен находиться в той же директории, что и ваш скрипт.
// Сформируйте путь к файлу с использованием метода `path.join` и специальной переменной `__dirname`.

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const originalPath = path.join(__dirname, 'example.jpg');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example3.jpg');
const renamedFilePath = path.join(__dirname, 'example4.jpg');
const copiedFilePath = path.join(__dirname, 'example5.jpg');

fs.rename(filePath, renamedFilePath, (err) => {
    if (err) {
        console.error('Ошибка при переименовании файла:', err);
        return;
    }
    console.log('Переименование завершено');
    fs.copyFile(renamedFilePath, copiedFilePath, (err) => {
        if (err) {
            console.error('Ошибка при копировании файла:', err);
            return;
        }
        console.log('Копирование завершено');
        fs.unlink(renamedFilePath, (err) => {
            if (err) {
                console.error('Ошибка при удалении файла:', err);
                return;
            }
            console.log('Удаление завершено');
        });
    }
    );
});

