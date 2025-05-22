// import express from "express";

// const app = express();

// app.get("/", (req, res) =>{
//     res.send("Hello World")
// })

// app.listen(3000, () => {
//     console.log("Server is lisstening on http://127.0.0.1:3000/");
    
// });


// 1. Установите пакет moment:
// ○ В терминале введите команду: npm install moment
// 2. Напишите скрипт, который выводит текущую дату и время в формате YYYYMMDD HH:mm:ss с
// использованием moment:
// ○ Создайте файл index.js.
// ○ Импортируйте модуль moment.
// ○ Используйте функцию moment для получения текущей даты и времени и отформатируйте ее.
// 3. Запустите скрипт: В терминале введите команду: node index.js. Вы должны увидеть текущую дату и время в
// формате YYYYMMDD HH:mm:ss.



import moment from "moment";

const now = moment().format("YYYY-DD-MM HH:mm:ss");

console.log(now);