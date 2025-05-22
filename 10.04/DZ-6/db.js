import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14881488',
  database: 'product_db'
});

db.connect(err => {
  if (err) console.error('DB connection failed:', err);
  else console.log('Connected to MySQL');
});

export default db;