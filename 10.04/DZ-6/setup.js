import db from './db.js';

const query = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  )
`;

db.query(query, (err) => {
  if (err) console.error('Failed to create table:', err);
  else console.log('Table "products" created successfully');
  db.end();
});