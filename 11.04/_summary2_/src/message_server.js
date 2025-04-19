/* Задание: API сообщений
Сделай Express-сервер с маршрутами:
POST /messages — принимает name и message, сохраняет сообщение
GET /messages — возвращает все сообщения
GET /messages/:name — возвращает сообщения только от указанного name
💡 Храни сообщения в массиве с полями: id, name, message, timestamp.
Проверь, чтобы name и message не были пустыми.
timestamp — текущее время (new Date().toISOString()). */

import express from 'express'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())

let messages = [{id: 1, name: 'John', message: 'Hello!', timestamp: new Date().toISOString()},
                {id: 2, name: 'Jane', message: 'Hi!', timestamp: new Date().toISOString()}]

app.get('/messages', (req, res) => {
    res.json(messages)
})

app.get('/messages/:name', (req, res) => {
    const { name } = req.params
    const filteredMessages = messages.filter(message => message.name === name)
    if (filteredMessages.length === 0) {
        res.status(404).json({ error: 'No messages found for this name' })
        return
    }
    res.json(filteredMessages)
})

app.post('/messages', (req, res) => {
    const { name, message } = req.body
    if (!name || !message) {
        res.status(400).json({ error: 'Fields name and message are required' })
        return
    }
    const newMessage = {
        id: messages.length + 1,
        name,
        message,
        timestamp: new Date().toISOString(),
    }
    messages.push(newMessage)
    // OR messages.push({ ...newMessage, id: messages.length + 1 })
    res.status(201).json(newMessage)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

