// controllers/authController.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.login = (req, res) => {
    const { username, password } = req.body;
    // ログインロジック（実際にはデータベースを参照して認証を行う）
    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Authentication failed');
    }
};

exports.protectedRoute = (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};
