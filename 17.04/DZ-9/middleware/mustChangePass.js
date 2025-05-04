import User from '../models/user.js';

const checkMustChangePassword = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

      if (user.mustChangePassword) {
        return res.status(403).json({ error: 'Необходима смена пароля' });
      }

      next();
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при проверке необходимости смены пароля' });
    });
};

export default checkMustChangePassword;