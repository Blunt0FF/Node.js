import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase, getDb } from './db/index.js';
import { ObjectId } from 'mongodb';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Главная страница
app.get('/', (req, res) => {
  res.json({ message: 'hello home page' });
});

// Подключение к базе и запуск сервера
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on PORT ' + port);
    });
  })
  .catch((err) => {
    console.error('Failed to start the server due to mongoDB error ', err);
  });

/* -------------------- Маршруты -------------------- */

// POST /products — создание продукта
app.post('/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (
      typeof name !== 'string' ||
      typeof price !== 'number' ||
      typeof description !== 'string'
    ) {
      return res.status(400).json({ error: 'Неверный формат данных. Укажите name, price & description' });
    }

    const db = getDb();
    const result = await db.collection('products').insertOne({ name, price, description });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось создать продукт' });
  }
});

// GET /products — список всех продуктов
app.get('/products', async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить список продуктов' });
  }
});

// GET /products/:id — получить продукт по ID
app.get('/products/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Неверный ID продукта' });
  }
  try {
    const db = getDb();
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении продукта' });
  }
});

// PUT /products/:id — обновить продукт
app.put('/products/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Неверный ID продукта' });
  }

  const { name, price, description } = req.body;

  if (
    (name && typeof name !== 'string') ||
    (price && typeof price !== 'number') ||
    (description && typeof description !== 'string')
  ) {
    return res.status(400).json({ error: 'Неверный формат данных' });
  }

  try {
    const db = getDb();
    const updated = await db.collection('products').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обновлении продукта' });
  }
});

// DELETE /products/:id — удалить продукт
app.delete('/products/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Неверный ID продукта' });
  }

  try {
    const db = getDb();
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при удалении продукта' });
  }
});