// Создайте новый проект:
// В терминале перейдите в каталог, где хотите создать проект.
// Выполните команду `npm init -y`, чтобы инициализировать новый проект с файлом `package.json`.

// Установите axios:
// Выполните команду `npm install axios`, чтобы установить библиотеку `axios`.

// Создайте файл для выполнения запроса:
// В корневом каталоге проекта создайте файл `axios-example.js`.

// Настройте axios для выполнения GET-запроса:
// Откройте файл `axios-example.js` в текстовом редакторе.
// Импортируйте модуль `axios`.
// Настройте GET-запрос к публичному API JSONPlaceholder (`https://jsonplaceholder.typicode.com/todos/1`). Выведите результат запроса в консоль.

// 5.    Запустите скрипт: в терминале выполните команду `node axios-example.js`, чтобы запустить скрипт и увидеть результат в консоли.

// import axios from "axios";

// axios.get("https://jsonplaceholder.typicode.com/todos/1")
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     });

///////////////////////////////////////////////////////////////////

// import fs from "fs"
// import axios from "axios"

// axios.get('https://jsonplaceholder.typicode.com/posts')
// .then((res) => {

//     const posts = res.data
//     console.log(posts)

//     const content = posts.map((item) => {
//         return `id: ${item.id} \ntitle: ${item.title} \nbody: ${item.body} \n`
//     }).join('')
//     console.log(content)

//     fs.writeFile('index.txt', content, (err) => {
//         if(err){
//             console.log('Error', err)
//             return
//         }

//         console.log('Success')

//         fs.readFile('index.txt', 'utf8', (err, data) => {
//             if(err){
//                 console.log('Error', err)
//                 return
//             }

//             console.log('Data:', data)
//         })
//     })

    
// }).catch(err => {
//     console.error('Error', err)
// })

/////////////////////////////////////////////////////////////////////

// Использование dotenv и axios для получения и вывода данных о погоде

// Создайте новый проект:
// В терминале перейдите в каталог, где хотите создать проект.
// Запустите команду `npm init -y`, чтобы создать файл `package.json`.

// Установите dotenv и axios: выполните команду `npm install dotenv axios`.

// Создайте файл `.env`:

// Создайте файл `.env` в корневом каталоге проекта.
// Добавьте строку `CITY=London`, чтобы задать город для получения данных о погоде.

// Создайте файл `weather.js`: создайте файл `weather.js` в корневом каталоге проекта.

// Импортируйте модули `dotenv` и `axios`:
// Откройте файл `weather.js` в текстовом редакторе.
// Импортируйте модули `dotenv` и `axios`.

// Загрузите переменные окружения из файла `.env`: используйте модуль `dotenv` для загрузки переменных окружения.

// Настройте GET-запрос к публичному API для получения данных о погоде: настройте GET-запрос к URL 
// `https://wttr.in/${CITY}?format=%t`, где `CITY` - это значение переменной окружения.

//   Выведите результат запроса в консоль: отправьте запрос и выведите температуру для указанного города в консоль.

//  Запустите скрипт командой `node weather.js`.

// import dotenv from "dotenv/config"
// import axios from "axios"

// const city = process.env.CITY

// const url = `https://wttr.in/${city}?format=%t`

// axios.get(url)
//     .then((res) => {
//         console.log(`The weather in ${city}: ${res.data}`)
//     })
//     .catch((err) => {
//         console.error("Error", err)
//     })


//////////////////////////////////////////////////////////////////////////


// Чтение большого файла с использованием потоков

// Создайте новый файл для скрипта, например, `streamTask1.js`.

// Импортируйте модуль `fs`.

// Создайте или найдите большой текстовый файл, например, `largeFile.txt`, и поместите его в ту же директорию, что и скрипт.

// Используйте метод `fs.createReadStream` для создания потока чтения из файла `largeFile.txt`.

// Подпишитесь на события потока:
// `data`: чтобы обрабатывать каждый фрагмент данных, прочитанный из файла.
// `end`: чтобы определить, когда чтение файла завершено.
// `error`: чтобы обрабатывать возможные ошибки.

// Выводите каждый фрагмент данных на консоль.

// После завершения чтения файла выведите сообщение о завершении.


// const path = require ('path')
// const fs = require ('fs')

// const filePath = path.join(__dirname, 'largeFile.txt')

// const readStream = fs.createReadStream (filePath, {encoding: 'utf8', highWaterMark: 64})

// readStream.on('data', (chunk) => {
//     console.log('Получен chunk: ', chunk);
// })
// readStream.on('end', () => {
//     console.log('Чтение завершено');
// })
// readStream.on('error', (error) => {
//     console.log('Ошибка при чтении: ', error);
// })


////////////////////////////////////////////////////////////////////////////////////

// Запись данных в файл с использованием потоков

// Создайте новый файл для скрипта, например, `streamTask2.js`.

// Импортируйте модуль `fs`.

// Определите данные, которые хотите записать в файл. Например, создайте строку с большим количеством текста или генерируйте данные в цикле.

// Используйте метод `fs.createWriteStream` для создания потока записи в новый файл, например, `output.txt`.

// Используйте метод `write` потока записи для записи данных в файл.

// Подпишитесь на события потока:
// `finish`: чтобы определить, когда запись данных завершена.
// `error`: чтобы обрабатывать возможные ошибки.

// После завершения записи данных закройте поток и выведите сообщение о завершении.

// const path = require ('path')
// const fs = require ('fs')

// let str = ''
// for( let index = 1; index<1000; index++)
//     str += `Это строка ${index}\n`

// const filePath = path.join(__dirname, 'output.txt')
// const writeStream = fs.createWriteStream (filePath, {encoding: 'utf8'})

// writeStream.on('finish', () => {
//     console.log('Запись завершена');
// }
// )
// writeStream.on('error', (error) => {
//     console.log('Ошибка при записи: ', error);
// })

// writeStream.write(str)
// writeStream.end()


// 1.	У тебя есть массив чисел с повторяющимися элементами numbers. Используй Set для удаления повторяющихся чисел и выведи результат.
// 2.	Для того же массива чисел используй библиотеку lodash и её метод _.uniq, чтобы также удалить дубликаты и выведи результат.
// 3.	У тебя есть массив пользователей users, где каждый объект содержит имя и роль пользователя. Разбей пользователей по их роли, создав новый объект, в котором ключом будет роль, а значением — массив пользователей с только их именами. Используй методы _.groupBy и _.mapValues из библиотеки lodash для решения.


const _ = require('lodash')
const numbers = [1, 2, 2, 3, 4, 4, 5];
const users = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' },
    { name: 'Charlie', role: 'admin' },
    { name: 'David', role: 'user' },
    { name: 'Eva', role: 'guest' }
  ];
const uniqueNumbers = [...new Set(numbers)]
console.log(uniqueNumbers);
const lodashNums = _.uniq(numbers)
console.log(lodashNums);
const groupedByRole = _.mapValues(_.groupBy(users, 'role'), (item) => item.map(user => ({name: user.name})))
console.log(groupedByRole);