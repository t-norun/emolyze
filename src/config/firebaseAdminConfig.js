// backend/src/config/firebaseAdminConfig.js（サーバーサイド用）
const admin = require('firebase-admin');

const serviceAccount = require('C:\\Users\\Unions\\Desktop\\project\\backend\\src\\config\\my-key.json'); // 正しいパスを設定

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
