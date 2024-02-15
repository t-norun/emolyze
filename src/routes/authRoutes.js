const express = require('express');
const { admin } = require('../config/firebaseAdminConfig'); // Firebase Admin SDKの設定をインポート
const { login, protectedRoute } = require('../controllers/authController'); // カスタム認証コントローラー
const { authenticateJWT } = require('../middleware/authMiddleware'); // JWT認証ミドルウェア

const router = express.Router();

// Firebaseを用いたユーザー登録エンドポイント
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ユーザーログインエンドポイント（Firebase Authentication SDKをクライアントサイドで使用）
// このルートはクライアントサイドでのログイン処理を想定しているため、サーバー側でのログイン処理を行わないことに注意
router.post('/login', login); // カスタムログイン処理

// 認証が必要なエンドポイント
router.get('/protected', authenticateJWT, protectedRoute);

module.exports = router;

