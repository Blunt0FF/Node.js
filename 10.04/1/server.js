// import express from 'express'
// const app = express()
// // 1. Данный мидлвар автоматически читает потоки при получении запроса, так, что мы в req.body получаем объект с тем, что передал пользователь
// // 2. читает application/json
// app.use(express.json())

// app.get('/', (req, res) => {
//     console.log('Welcome to express server')
//     res.send('welcome to js server')
// })

// app.get('/users', (req, res) => {
//     res.send('users page')
// })

// app.get('/users/:id', (req, res) => {
//     //из объекта req, можно достать поле params с параметрами адреса запроса типа users/1,2, 3
//     const userParams = req.params.id
//     console.log(userParams)
//     res.send(`user id: ${userParams}`)
// })

// app.listen(3000, () => {
//     console.log('server is listening on port 3000')
// })

///////////////////////////////////////////////////////////////////////

// Создайте новый проект Node.js и установите Express.js, если вы еще этого не сделали.

// Создайте файл `index.js` и откройте его в текстовом редакторе.

// Импортируйте Express и создайте экземпляр приложения.

// Создайте следующие маршруты:

// Корневой маршрут (`/`), который возвращает строку "Welcome to my site!".
// Маршрут для получения списка продуктов (`/products`), который возвращает строку "List of products".

// Откройте браузер и перейдите по адресу `http://localhost:3000` для проверки корневого маршрута и `http://localhost:3000/products` для проверки маршрута продуктов.

// import express from 'express'

// const app = express()
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Welcome to my site!')
// })

// app.get('/products', (req, res) => {
//     res.send('List of products')
// })

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000')
// })

//////////////////////////////////////////////////////////////////////

// app.get('/search', (req, res) => {
//     //query string мы можем класть какую либо информацию после маршрута с помощью ?isLogging=true&hehehe=fdala
//     const query = req.query
//     console.log(query)
//     res.send('find something')
// })

//////////////////////////////////////////////////////////////////////////////



// Создайте новый проект Node.js и установите Express.js, если вы еще этого не сделали.

// Создайте файл `index.js` и откройте его в текстовом редакторе.

// Импортируйте Express и создайте экземпляр приложения.

// Создайте следующие маршруты:

// Корневой маршрут (`/`), который возвращает строку "Hello, World!".
// Маршрут для получения всех пользователей (`/users`), который возвращает строку "List of users".
// Маршрут для получения конкретного пользователя по ID (`/users/:id`), который возвращает строку с ID пользователя.
// Маршрут для поиска (`/search`), который принимает параметр запроса `q` и возвращает строку с этим параметром.

// Запустите сервер и протестируйте маршруты в браузере.

// import express from 'express'
// const app = express()
// app.use(express.json())
// app.get('/', (req, res) =>{
//   res.send('Hello, World!')
// })
// app.get('/users', (req, res) =>{
//   res.send('List of users')
// })
// app.get('/search', (req, res) =>{
//   const query = req.query
//   console.log(query.q)
//   res.send(`Query string: ${query.q}`)
  
// })
// app.get('/users/:id', (req, res) =>{
//   const param = req.params.id
//   console.log(param)
//   res.send(`User ID: ${param}`)
// })
// app.listen(3000, () =>{
//   console.log('Server is listening to port: http://localhost:3000')
// })

/////////////////////////////////////////////////////////////////////////////

// app.post("/submit", (req, res) => {
//     const { username, email } = req.body;
//     if (!username || !email) {
//       res.json({ error: "not enough data" });
//       return;
//     }
//     res.json({
//       message: "user was successfully created",
//       user: { email, username },
//     });
//   });

///////////////////////////////////////////////////////////////////////////////
