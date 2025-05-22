const http = require('http')
// import http from 'http'

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('Home page')
    } else if(req.url === '/about') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('About page')
    } else if(req.url === '/shop') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('shop page')
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Page not found')
    }
})

server.listen(5555, '127.0.0.1', () => {
    console.log('Server is listening on port http://127.0.0.1:5555/',)
})