/* Задание: сервер заметок на Express
Создай Express-сервер
Сделай два маршрута:
GET /notes — возвращает массив заметок
POST /notes — принимает { text: "..." }, добавляет в массив, возвращает id
Заметки хранятся в памяти (let notes = [])
У каждой заметки должен быть id (уникальный, например, автоинкремент) 
Id можно передать через new Date()
*/

import express from "express"
import 'dotenv/config'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3333

let notes = [] // массив заметок
// let notes = [   { id: 1, text: 'Заметка 1' },   { id: 2, text: 'Заметка 2' },   { id: 3, text: 'Заметка 3' } ]

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.post('/notes', (req, res) => {
    const { text } = req.body
    if (!text) {
        res.status(400).json({ error: 'Field text is required' })
        return
    }
    const note = {
        id: new Date(),
        text,
    }
    notes.push(note)
    res.status(201).json(note)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})