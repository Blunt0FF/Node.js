import express from 'express';
import cors from 'cors';  

const app = express();
app.use(cors());  

app.get('/', (req, res) => {
    res.send('Hello Juice World!');
});

app.get('/user', (req, res) => {
    res.json({
        name: 'Juice WRLD',
        age: 21,
        genre: 'Hip-Hop'
    });
});
app.get('/data', (req, res) => {
    res.json([
        { title: 'Title 1', description: 'Description 1' },
        { title: 'Title 2', description: 'Description 2' },
        { title: 'Title 3', description: 'Description 3' }
    ]);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});  