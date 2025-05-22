// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'errors.log');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    // Проверка заголовка Authorization
    const auth = req.headers['authorization'];
    if (!auth) {
        res.statusCode = 401;
        return res.end('Unauthorized');
    }

    // Обработка методов PUT и DELETE
    if (req.method === 'PUT') {
        res.statusCode = 200;
        return res.end('PUT-запрос обработан');
    }

    if (req.method === 'DELETE') {
        res.statusCode = 200;
        return res.end('DELETE-запрос обработан');
    }

        try {
            throw new Error('Ошибка');
        } catch (err) {
            const logMessage = `[${new Date().toISOString()}] ${err.stack}\n`;
    
            fs.appendFile(logPath, logMessage, (fsErr) => {
                if (fsErr) {
                    console.error('Ошибка при записи в лог:', fsErr);
                }
            });
    
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        }
});

server.listen(3000, () => {
    console.log('Универсальный сервер запущен на http://localhost:3000');
});