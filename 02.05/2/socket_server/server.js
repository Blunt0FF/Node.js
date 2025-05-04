import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer); // <-- Создаем socket.io сервер

// Настройка пути
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../front"))); // Подключение фронтенда

// Обработка соединений Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Рассылка всем
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Запуск сервера
httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});