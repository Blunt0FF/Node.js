import express from 'express';
import db from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

/* -------- GET / -------- */
app.get('/', (req, res) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    console.error('Ошибка в GET /:', error);
    res.status(500).send('Внутренняя ошибка сервера');
  }
});

/* -------- POST / -------- */
app.post('/', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Поле message обязательно' });
  }

  try {
    res.json({ received: message });
  } catch (error) {
    console.error('Ошибка в POST /:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

/* -------- GET /products -------- */
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Ошибка при получении продуктов:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

/* -------- POST /products -------- */
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Укажите корректные name и price' });
  }

  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(sql, [name, price], (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении продукта:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.status(201).json({ message: 'Продукт добавлен', productId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});