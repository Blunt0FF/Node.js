// Создайте middleware для проверки JWT:

// Создайте middleware, которое будет проверять наличие и корректность JWT в заголовке запроса.
// Если токен корректный, middleware должно декодировать его и передать данные пользователя (например, `id`, `username`, `role`) в объект `req.user`.
// Если токен отсутствует или недействителен, middleware должно возвращать ошибку с кодом `401 Unauthorized`.

// Примените middleware к защищённым маршрутам:

// Используйте созданное middleware для защиты маршрутов, к которым должны иметь доступ только аутентифицированные пользователи.
// Создайте маршрут `/profile`, который возвращает данные профиля пользователя. Этот маршрут должен быть доступен только после успешной проверки токена с помощью вашего middleware.

// Тестирование маршрутов:

// После настройки middleware и маршрутов, отправьте запросы с валидным и невалидным токеном, чтобы убедиться, что ваш middleware работает корректно.

import jwt from 'jsonwebtoken'
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization
    console.log(authHeader);
    
    if(authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if(error) {
                res.status(403).json({message: 'Invalid or expired token'})
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({message: 'Unauthorized user'})
    }
}
export default authenticateJWT

app.get('/profile', authenticateJWT, (req, res) => {
    res.json({message: "Profile 1", id: req.user.id, email: req.user.email})
}