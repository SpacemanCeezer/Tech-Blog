const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.userId;
    const userPosts = await Post.findAll({ where: { userId } });
    res.render('dashboard', { userPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
