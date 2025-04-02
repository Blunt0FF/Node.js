const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;


    let content = '';
    let statusCode = 200;

    if (path === '/') {
        content = '<h1>Welcome to the Home Page!</h1><a href="/about">About</a> | <a href="/contact">Contact</a>';
    } else if (path === '/about') {
        content = '<h1>About Us</h1><p>This is the About page.</p><a href="/">Home</a> | <a href="/contact">Contact</a>';
    } else if (path === '/contact') {
        content = '<h1>Contact</h1><p>Email us at contact@example.com</p><a href="/">Home</a> | <a href="/about">About</a>';
    } else {
        statusCode = 404;
        content = '<h1>404 Not Found</h1><a href="/">Go Home</a>';
    }


    res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(content);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});