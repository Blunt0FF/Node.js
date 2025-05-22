// Настройте сервер для обработки данных из тела запроса с помощью middleware.
// Это просто express.json() мидлвар

// Создайте маршруты для обработки GET и POST запросов:
// Маршрут для получения пользователя по ID с использованием параметров маршрута и запроса.
// Маршрут для получения текстового ответа.
// Маршрут для получения JSON-ответа.
// Маршрут для отправки данных через POST-запрос, который возвращает полученные данные.

// Запустите сервер и протестируйте маршруты в браузере или с помощью инструментов вроде Postman.

// import express from 'express';

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/user/:id', (req, res) => {
//   res.json({ id: req.params.id, query: req.query });
// });

// app.get('/text', (req, res) => {
//   res.send('Простой текстовый ответ');
// });

// app.get('/json', (req, res) => {
//   res.json({ status: 'OK', data: [1, 2, 3] });
// });

// app.post('/data', (req, res) => {
//   res.json({ received: req.body });
// });

// app.listen(port, () => {
//   console.log(`Сервер запущен на http://localhost:${port}`);
// });





///////////////

// import express from 'express'
// const app = express()
// app.use(express.json())
// app.get('/', (req, res) =>{
//   res.send('Welcome home!')
// })
// app.get('/users', (req, res) =>{
//   res.send('List of users')
// })
// app.get('/search', (req, res) =>{
//   const query = req.query
//   res.send(`Query string: ${query.q}`)
  
// })
// app.get('/users/:id', (req, res) =>{
//   const param = req.params.id
//   res.send(`User ID: ${param}`)
// })
// app.post('/answer', (req, res) => {
//     const {name, astroSign} = req.body
//     if(!name || !astroSign) {
//         res.status(404).json({error: 'User is not found'});
//     }
//     res.json({message: 'User is successfully registered', user: {name, astroSign}})
// })
// app.listen(3000, () =>{
//   console.log('Server is listening to port: http://localhost:3000')
// })


