import express from 'express';
import sequelize from './config/db.js';
import Book from './models/book.js';

const app = express();
app.use(express.json()); // Middleware для парсинга JSON данных

// GET маршрут для получения списка всех книг
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// POST маршрут для создания новой книги
app.post('/books', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// PUT маршрут для обновления книги по её title
app.put('/books/:title', async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { title: req.params.title },
    });
    if (updated) {
      const updatedBook = await Book.findOne({ where: { title: req.params.title } });
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE маршрут для удаления книги по её title
app.delete('/books/:title', async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { title: req.params.title },
    });
    if (deleted) {
      res.status(204).json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});