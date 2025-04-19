// Настройка переменных окружения:
// Создайте файл `.env` в корне проекта.
// Добавьте в него переменные `PORT=3000` и `MESSAGE="Привет от сервера"`.

// Подключение и использование переменных окружения:
// Импортируйте модуль `dotenv` и вызовите `dotenv.config()`.
// Получите значения переменных окружения `PORT` и `MESSAGE`.

// Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.
// Формирование ответа:
// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ с сообщением из переменной окружения `MESSAGE`.

// Запуск сервера:
// Настройте сервер на прослушивание порта из переменной окружения `PORT`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

// import http from 'http'
// import 'dotenv/config'
// const port = process.env.PORT

// const server = http.createServer((req, res) =>{
//     res.statusCode = 200
//     res.setHeader('Content-type', 'application/json')
//     res.end(JSON.stringify(({message: process.env.MESSAGE || 'Привет от сервера'})))
// })

// server.listen(port, () =>{
//     console.log(`Server is listening at: http://127.0.0.1:${port}`);
// })

///////////////////////////////////////////////////////////////////////////////////


// Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.

// Обработка POST-запросов:
// В функции обратного вызова для сервера проверяйте метод запроса (`req.method`) и URL (`req.url`).
// Если метод запроса `POST` и URL `/submit`, логируйте тело запроса в консоль. Используйте события `data` и `end` для чтения данных из запроса.

// Настройка заголовков:
// Установите заголовок `Access-Control-Allow-Origin` со значением `*`.
// Установите заголовок `Content-Type` в `application/json`.

// 4.    Формирование ответа:
// Установите статус ответа `200`.
// Отправьте JSON-ответ с сообщением "POST-запрос обработан".

// 5.     Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера

// import http from 'http'

// const server = http.createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     if(req.method === 'POST' && req.url == '/submit'){
//         let bodyReq = ''
//         req.on('data', (chunk) => {
//             body += chunk.toString()
//         })
//         req.on('end', () =>{
//             try {
//                 const parsedData = JSON.parse(body)
//                 console.log('Body request: ', parsedData);
//                 res.statusCode = 200
//                 res.end(JSON.stringify({message: 'Alles Gut'}))
                
//             } catch (error) {
//                 res.statusCode = 400
//                 res.end(JSON.stringify({ error: 'Invalid JSON'}))
//             }
//         })
//     }else {
//         res.statusCode = 400
//         res.end(JSON.stringify({message: 'Not found page!'}))
//     }
// })

// server.listen(process.env.PORT, () => {
//     console.log('Server is running');
    
// })

///////////////////////////////////////////////////////////////////

