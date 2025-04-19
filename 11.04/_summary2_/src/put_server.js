import express from 'express'
const app = express()
app.use(express.json())
const URL = 'http://127.0.0.1'
const PORT = 3000
class PATH {
  HOME = '/'
  MESSAGES = '/messages'
  SEARCH = '/search'
}
const path = new PATH()
let messages = [{ id: 1, name: 'John', message: 'abc', timestamp: '3:00' }]
app.get(path.HOME, (req, res) => {
  res.send('HOME')
})
app.post(path.MESSAGES, (req, res) => {
  const data = req.body
  if (!data.name || !data.message) {
    res.status(500).json({ error: 'error completed' })
    return
  }
  messages.push({ id: messages.length + 1, ...data, timestamp: new Date() })
  res.status(201).json({ messages: 'successfully send' })
})
app.get(path.MESSAGES, (req, res) => {
  res.json(messages)
})
app.get(`${path.MESSAGES}/:id`, (req, res) => {
  const param = req.params.id
  console.log(param)
  const result = messages.filter(sms => Number(sms.id) === Number(param))
  res.json(result)
})
app.put(`${path.MESSAGES}/:id`, (req, res) => {
  const params = Number(req.params.id)
  const { message } = req.body
  if (!message) {
    res.status(500).json({ error: 'error data changing' })
    return
  }
  const currItem = messages.find(item => +item.id === params)
  if (!currItem) {
    res.status(404).json({ error: 'data not found' })
    return
  }
  currItem.message = message
  res.status(200).json({ message: 'data successfully changed' })
})

/* app.put(`${path.MESSAGES}/:id`, (req, res) => {
  const params = Number(req.params.id)
  const { message } = req.body
  if (!message) {
    res.status(500).json({ error: 'error data' })
    return
  }
  const currentItem = messages.find(item => +item.id === params)
  if (!currentItem) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  currentItem.message = message
  res.status(200).json({ message: 'successfully update' })
}) */

app.listen(PORT, () => {
  console.log(`Server is listening: ${URL}:${PORT}`)
})