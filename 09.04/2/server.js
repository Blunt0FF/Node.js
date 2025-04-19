// Простое API-сервер на http с поддержкой CORS и GET-запросов
// 📋 Условие:
// Создай HTTP-сервер, который:
// При GET запросе на / возвращает { "message": "Добро пожаловать на API" }
// При GET запросе на /users возвращает список пользователей:[
//   { "id": 1, "name": "Alice" },
//   { "id": 2, "name": "Bob" }
// ]
// На все другие маршруты возвращает:{ "error": "Not found" }
// Добавь заголовки:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET
// Access-Control-Allow-Headers: Content-Type
// Content-Type: application/json
// Сервер должен слушать порт 3000.

import http from 'http'
const users = [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
const server = http.createServer((req, res) =>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')
  if(req.method === 'GET'){
    
    if(req.url === '/'){
      res.statusCode = 200
      res.end(JSON.stringify({ message: "Добро пожаловать на API" }))
    } else if(req.url === '/users'){
      res.statusCode = 200
      res.end(JSON.stringify(users))
    } else {
      res.end(JSON.stringify({ "error": "Not found" }))
    }
  }
})
server.listen(3000, () =>{
  console.log('Server is listening on port: http://127.0.0.1:3000/')
})