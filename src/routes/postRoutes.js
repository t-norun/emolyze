// postRoutes.js
const { Router } = require('express');
const { db } = require('./firebaseConfig');
const router = Router();

router.post('/post', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const docRef = await db.collection('posts').add({
      userId,
      content,
      createdAt: new Date().toISOString()
    });
    res.status(201).send({ postId: docRef.id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
