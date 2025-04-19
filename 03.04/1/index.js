

// Создайте текстовый файл `input.txt` и добавьте в него любой текст, например: "Привет, мир!".

// Напишите скрипт, который будет читать содержимое файла `input.txt` асинхронно с использованием метода `fs.readFile`.

// После успешного чтения файла, ваш скрипт должен записать прочитанное содержимое в новый файл `output.txt` с использованием метода `fs.writeFile` и сообщать об этом при помощи вывода сообщения в консоль.

// Добавьте вывод любого сообщения в консоль при помощи `console.log` в самом конце кода вашего приложения.

// Запустите ваш скрипт и убедитесь, что содержимое файла `input.txt` было успешно скопировано в `output.txt`. Также убедитесь, что сообщение, выводимое при помощи ‘console.log’ в конце приложения, появилось в консоли раньше, чем сообщение о том, что содержимое файла `input.txt` было успешно скопировано в `output.txt`.

// import fs from 'fs'

// fs.readFile('input.txt', 'utf8', (err, data) => {
//     if(err) {
//         console.error('Error by reading file: ', err);
//         return
//     }
//     console.log(data);

//     fs.writeFile( 'output.txt', data, 'utf-8', (err) => {
//         if
//         (err) {
//         console.error ('Error by writing in output.txt', err)
//         return
//         console.log( 'File successfully writed')
//         }})
    
// })

/////////////////////////////////////////

// import fs from 'fs';

// setTimeout(() => {
//   console.log('hello');
// }, 3000);

// try {
//   fs.writeFileSync('example.txt', 'hello example', 'utf-8');
//   console.log('File was created');
// } catch (error) {
//   console.error('Error occurred writing file.');
// }

// try {
//   const data = fs.readFileSync('example.txt', 'utf-8')
//   console.log(data);
// } catch (error) {
//   console.error('Error occurred reading file.');
// }


// Создайте текстовый файл `input.txt` и добавьте в него любой текст, например: "Привет, Node.js!".

// Напишите скрипт, который будет читать содержимое файла `input.txt` синхронно с использованием метода `fs.readFileSync`.

// После успешного чтения файла, ваш скрипт должен записать прочитанное содержимое в новый файл `output.txt` с использованием метода `fs.writeFileSync` и сообщать об этом при помощи вывода сообщения в консоль..

// Добавьте вывод любого сообщения в консоль при помощи `console.log` в самом конце кода вашего приложения.

// Запустите ваш скрипт и убедитесь, что содержимое файла `input.txt` было успешно скопировано в `output.txt`. Также убедитесь, что сообщение, выводимое при помощи ‘console.log’ в конце приложения, появилось в консоли позже, чем сообщение о том, что содержимое файла `input.txt` было успешно скопировано в `output.txt`.

// import fs from 'fs';


// try {
//     const data = fs.readFile('input.txt', 'utf8')
//     console.log(data);
//     fs.writeFileSync('output.txt', data, 'utf8')
//     console.log('File successfully written');

// } catch (error) {
//     console.error('Error: ', error);
    
// }

////////////////////////////////////////////////

// import fs from 'fs'

// setTimeout(() => {
//     console.log('hello')
// }, 3000)

// try {
//     fs.writeFileSync(
//         'example.txt',
//         'hello example',
//         'utf-8'
//      )
//      console.log('File was created')
// } catch(error) {
//     console.error('Error occured writing file.')
// }

// try {
//     const data = fs.readFileSync('example.txt', 'utf-8')
//     console.log(data)
// } catch(error) {
//     console.error('Error occured reading file. Possible no such a file')
// }

// console.log('The end')

// function customWriteFileSync(name, lastName, age) {
//     return `${name} - ${lastName} - ${age}`
// }

// console.log(customWriteFileSync(98, 'john', 'smith'))




// Создайте текстовый файл `input.txt` и добавьте в него большой объем текста или повторяющуюся строку, например: "Node.js потоки\n". Повторите эту строку несколько сотен раз.

// Напишите скрипт, который будет создавать читающий поток для файла `input.txt` с использованием метода `fs.createReadStream`.

// Обработайте событие `data`, чтобы выводить куски данных на консоль по мере их чтения.

// Обработайте событие `end`, чтобы вывести сообщение, когда чтение файла завершено.

// Запустите ваш скрипт и убедитесь, что данные из файла `input.txt` читаются и выводятся на консоль частями.

// import fs from 'fs'

// const ReadStream = fs.createReadStream('input.txt', {encoding: 'utf8', highWaterMark: 64, })
// ReadStream.on('data', (chunk) => {
//     console.log('Chunk: \n', chunk);
// })
// ReadStream.on('end', () => {
//     console.log('end of reading file');
// })

// ReadStream.on('error', () => {
//     console.error('error:', error);
// })

////////////////////////////////////////////////////////////////////////////

// Создайте текстовый файл `input.txt` и добавьте в него большой объем текста или повторяющуюся строку, например: "Копирование файлов с использованием потоков\n". Повторите эту строку несколько сотен раз.

// Напишите скрипт, который будет создавать читающий поток для файла `input.txt` с использованием метода `fs.createReadStream`.

// Создайте записывающий поток для нового файла `output.txt` с использованием метода `fs.createWriteStream`.

// Объедините читающий и записывающий потоки с помощью метода `pipe`.

// Обработайте событие `finish` для записывающего потока, чтобы вывести сообщение о завершении копирования.

// Обработайте события `error` для обоих потоков для обработки возможных ошибок при чтении и записи.

// Запустите ваш скрипт и убедитесь, что содержимое файла `input.txt` было успешно скопировано в `output.txt`.

// import fs from 'fs'

// const readStream = fs.createReadStream('input.txt');
// const writeStream = fs.createWriteStream('output.txt');

// readStream.on('error', (err) => {
//   console.error('Ошибка при чтении файла:', err);
// });
// writeStream.on('error', (err) => {
//   console.error('Ошибка при записи файла:', err);
// });

// readStream.pipe(writeStream);

// writeStream.on('finish', () => {
//   console.log('Файл успешно скопирован в output.txt');
// });

////////////////////////////////////////////////////////////////

// Создайте новый скрипт в вашем проекте, например, `app.js`.

// Импортируйте необходимые модули `fs` и `path` в ваш скрипт.

// Создайте новый каталог с именем `test` в текущей директории с использованием метода `fs.mkdir`.

// После успешного создания каталога, создайте файл с именем `example.txt` внутри каталога `test` и запишите в него текст, например, "Hello, Node.js!" с использованием метода `fs.writeFile`.

// После успешной записи файла, прочитайте содержимое каталога `test` с использованием метода `fs.readdir`.

// Выведите содержимое каталога `test` на консоль.


const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'test');


fs.mkdir(dirPath, (err) => {
    if (err) {
        return console.error('Ошибка при создании каталога:', err);
    }
    console.log('Каталог успешно создан.');
    const filePath = path.join(dirPath, 'example.txt')

    fs.writeFile(filePath, 'Hello, Node.js!', 'utf8', (err) => {
        if (err) {
            return console.error('Ошибка при записи файла:', err);
        }
        console.log('Файл успешно создан и записан.');

        fs.readdir(dirPath, (err, files) => {
            if (err) {
                return console.error('Ошибка при чтении каталога:', err);
            }
            console.log('Содержимое каталога:', files);
        });
    });
});

