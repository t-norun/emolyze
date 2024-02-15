const express = require('express');
const router = express.Router();
const { LanguageServiceClient } = require('@google-cloud/language');
// firebaseAdminConfig.jsからadminとdbをインポート
const { db } = require('../config/firebaseAdminConfig');

// Google Cloud Natural Language APIクライアントの初期化
const client = new LanguageServiceClient();

router.post('/', async (req, res) => {
  const { text } = req.body;
  const document = { content: text, type: 'PLAIN_TEXT' };

  try {
    const [result] = await client.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;

    // Firestoreに分析結果を保存
    await db.collection('analysisResults').add({
      text,
      sentiment,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: 'Analysis saved successfully', sentiment });
  } catch (error) {
    console.error(`Error at analyzeSentiment: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

