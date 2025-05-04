import express from 'express';
import bcrypt from 'bcrypt';
import sequelize from './config/db.js';
import User from './models/user.js'; // Модель пользователя
import authenticateToken from './middleware/authenticateToken.js';
import checkAdminRole from './middleware/checkAdminRole.js';
import checkMustChangePassword from './middleware/mustChangePass.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json()); // Middleware для парсинга JSON данных

app.get('/users', authenticateToken, checkAdminRole, async (req, res) => {
  try {
    // Получение всех пользователей из базы данных
    const users = await User.findAll();

    // Отправка данных пользователям
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});


// 1. Регистрация пользователя
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверка на уникальность email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email уже зарегистрирован' });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

// Вход пользователя и получение токена
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Проверка пароля
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Неверный пароль' });

    // Проверка mustChangePassword
    if (user.mustChangePassword) {
      return res.status(403).json({ 
        error: 'Необходима смена пароля', 
        mustChangePassword: true 
      });
    }

    // Генерация токена
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Успешный вход', token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

// 2. Смена пароля
app.post('/change-password', authenticateToken, checkMustChangePassword, async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Проверка текущего пароля
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Неверный пароль' });

    // Хэширование нового пароля
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновление пароля и сброс флага mustChangePassword
    user.password = hashedPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: 'Пароль успешно обновлен' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при смене пароля' });
  }
});

// 3. Удаление аккаунта
app.post('/delete-account', authenticateToken, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Сравнение пароля с сохраненным в базе
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Неверный пароль' });

    // Удаление пользователя
    await user.destroy();
    res.status(200).json({ message: 'Аккаунт успешно удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении аккаунта' });
  }
});

// 4. Ограничение доступа к маршрутам для администраторов
app.get('/admin', authenticateToken, checkAdminRole, (req, res) => {
  res.status(200).json({ message: 'Добро пожаловать, администратор' });
});

// 5. Смена email
app.post('/change-email', authenticateToken, async (req, res) => {
  const { email, currentPassword, newEmail } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Проверка пароля
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Неверный пароль' });

    // Проверка уникальности нового email
    const emailExists = await User.findOne({ where: { email: newEmail } });
    if (emailExists) return res.status(400).json({ error: 'Email уже зарегистрирован' });

    // Обновление email
    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: 'Email успешно обновлен' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при изменении email' });
  }
});
// 6. Обновление роли пользователя
app.post('/update-role', async (req, res) => {
  const { email, role } = req.body;

  try {
    // Проверка на существование пользователя
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Проверка корректности роли
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Некорректная роль' });
    }

    // Обновление роли пользователя
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Роль успешно обновлена', user });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении роли' });
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