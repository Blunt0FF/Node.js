import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Получаем токен из заголовка

  if (!token) return res.status(401).json({ error: 'Токен не предоставлен' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });

    req.user = user; // Записываем данные пользователя в запрос
    next();
  });
};

export default authenticateToken;