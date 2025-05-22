const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const responses = [
  "Интересно, расскажи больше!",
  "Почему ты так думаешь?",
  "Согласен.",
  "Хороший вопрос!",
  "Давай подумаем об этом вместе.",
  "Это круто!",
  "Можешь уточнить?",
  "Я не уверен, что понял тебя.",
  "Продолжай.",
  "Звучит захватывающе!"
]

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  console.log('Пользователь подключён')

  socket.on('chat message', (msg) => {
    console.log('Получено сообщение:', msg)

    // Отправка рандомного ответа
    const randomReply = responses[Math.floor(Math.random() * responses.length)]
    setTimeout(() => {
      socket.emit('chat message', randomReply)
    }, 800)
  })

  socket.on('disconnect', () => {
    console.log('Пользователь отключён')
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})