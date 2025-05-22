const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// Simulated User Database
let users = [
  {
    id: 1,
    username: 'user',
    password: bcrypt.hashSync('password', 8),
    email: 'user@example.com',
    role: 'admin'
  }
];

const secretKey = process.env.JWT_SECRET;

// Middleware for JWT authentication
function authenticateJWT(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];

    jwt.verify(bearerToken, secretKey, (err, decoded) => {
      if (err) return res.status(403).send({ message: "Invalid token" });

      req.userEmail = decoded.email;
      next();
    });
  } else {
    res.status(403).send({ message: "No token provided" });
  }
}

// Middleware for role authorization
function authorizeRole(role) {
  return (req, res, next) => {
    const user = users.find((u) => u.email === req.userEmail);

    if (!user || user.role !== role)
      return res.status(403).send({ message: "Unauthorized" });

    next();
  }
}

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).send({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "2h" });

  res.json({ auth: true, token });
});

app.put('/update-email', authenticateJWT, (req, res) => {
  const { email, newEmail } = req.body;

  if (!email || !newEmail) {
    return res.status(400).send({ message: "Both 'email' and 'newEmail' are required" });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).send({ message: "User not found with provided email" });
  }

  try {
    user.email = newEmail;
    res.json({ message: "Email updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete account
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const user = users.find((u) => u.email === req.userEmail);

  if (!user) return res.status(404).send({ message: "User not found" });

  try {
    users = users.filter((u) => u.email !== req.userEmail);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update role
app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { email, newRole } = req.body;

  if (!email || !newRole) {
    return res.status(400).send({ message: "Email and new role are required" });
  }

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).send({ message: "User not found" });

  try {
    user.role = newRole;
    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Refresh token
app.post('/refresh-token', authenticateJWT, (req, res) => {
  const user = users.find((u) => u.email === req.userEmail);

  if (!user) return res.status(401).send({ message: 'Invalid credentials' });

  try {
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "2h" });
    res.json({ auth: true, token });
  } catch (err) {
    res.status(500).send({ auth: false, message: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));