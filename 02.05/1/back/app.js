import express from 'express';
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello home page' });
});

// app.get('/', (req, res) => {
//   res.send('_____hello world==');
// });

app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.json({message: 'Data received'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
