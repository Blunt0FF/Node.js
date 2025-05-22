
// Импортируйте модуль `http`.

// Создайте сервер с использованием метода `http.createServer()`. 

// В функции обратного вызова проверьте URL запроса, используя свойство `req.url`.

// В зависимости от значения URL, отправьте различный текст в ответе.

// Если URL равен `/`, отправьте текст "Главная страница".
// Если URL равен `/about`, отправьте текст "О нас".
// Если URL равен `/contact`, отправьте текст "Контакты".
// Для всех остальных URL отправьте текст "Страница не найдена" и установите статус ответа `404`.

// Установите заголовок ответа `Content-Type` в `text/plain` для всех ответов.

// Настройте сервер на прослушивание определенного порта, например, `3000`.

// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/plain');

//     if (req.url === '/') {
//         res.statusCode = 200;
//         res.end('Главная страница');
//     } else if (req.url === '/about') {
//         res.statusCode = 200;
//         res.end('О нас');
//     } else if (req.url === '/contact') {
//         res.statusCode = 200;
//         res.end('Контакты');
//     } else {
//         res.statusCode = 404;
//         res.end('Страница не найдена');
//     }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.

// Настройка заголовков CORS:
// В функции обратного вызова для сервера установите заголовок `Access-Control-Allow-Origin` со значением `*`, чтобы разрешить доступ с любого домена.
// Установите заголовок `Access-Control-Allow-Methods` со значением `GET, POST, PUT, DELETE`.
// Установите заголовок `Access-Control-Allow-Headers` со значением `Content-Type`.

// Формирование ответа:
// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `application/json`.
// Отправьте JSON-ответ с сообщением "CORS enabled".

// Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

// import http, { createServer } from 'http';
// const server = createServer( (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' )
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify({message: 'CORS enabled'}))
// })

// server.listen(3000, () =>{
//     console.log('Server is running on port http://localhost:3000');
    
// })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.
// Чтение заголовка Authorization:
// В функции обратного вызова для сервера прочитайте заголовок `Authorization` из объекта запроса (`req.headers['authorization']`).
// Логируйте значение заголовка `Authorization` в консоль.
// Настройка заголовка Cache-Control:
// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Установите заголовок `Cache-Control` со значением `public, max-age=3600` для кэширования ресурса на 1 час.
// Отправка ответа:
// Отправьте текстовый ответ с сообщением "Authorization header logged, and Cache-Control header set".
// Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

import http from 'http'
const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.end('Authorization header logged, and Cache-Control header set')

})
const port = 3000
server.listen(port, () => {
    console.log(`Server is listening on: http://127.0.0.1:${port}`);
    
})