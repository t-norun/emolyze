require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const { LanguageServiceClient } = require('@google-cloud/language');

const app = express();


app.use(cors());
app.use(express.json());

// ルートのインポート
const analyzeRoutes = require('./routes/analyzeRoutes');
const authRoutes = require('./routes/authRoutes');

// ルートの使用
app.use('/api/analyze', analyzeRoutes);
app.use('/api/auth', authRoutes);

// HTTPSサーバー用の設定
const httpsOptions = {
  key: fs.readFileSync('C:/Users/Unions/Desktop/project/backend/certs/server.key'),
  cert: fs.readFileSync('C:/Users/Unions/Desktop/project/backend/certs/server.cert')
};

app.get('/', (req, res) => {
  res.send('Hello, HTTPS world!');
});

const PORT = process.env.PORT || 3001;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});



