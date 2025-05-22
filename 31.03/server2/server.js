const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('hello world <a href="/about">About</a> <a href="/shop">Shop</a>')
})

app.get('/about', (req, res) => {
    res.send('hello world from about page <a href="/">Home</a>')
})

app.get('/shop', (req, res) => {
    res.send('hello world from shop page <a href="/">Home</a>')
})

app.listen(port, () => {
    console.log('server is listening on port 3000')
})