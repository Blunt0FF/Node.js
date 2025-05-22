import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Article from './models/Article.js';
import Tag from './models/Tag.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Успешно подключено к MongoDB');
  app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('❌ Ошибка подключения к MongoDB:', error);
});



app.post('/publishers', async (req, res) => {
  try {
    const publisher = await Publisher.create(req.body);
    res.status(201).json(publisher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/magazines', async (req, res) => {
  try {
    const magazine = await Magazine.create(req.body);
    res.status(201).json(magazine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/magazines', async (req, res) => {
  try {
    const magazines = await Magazine.find().populate('publisher');
    res.json(magazines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post('/articles', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/tags', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().populate('tags');
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find().populate('articles');
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});