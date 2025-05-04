const checkAdminRole = (req, res, next) => {
    const userRole = req.user.role; // Должен быть доступ к текущей роли пользователя
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Доступ ограничен' });
    }
    next();
  };
  
  export default checkAdminRole;