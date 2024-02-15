const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

router.post('/post', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    const post = await Post.create({ title, content, userId });
    res.status(201).redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId } });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/post/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.userId;
    const { content } = req.body;
    await Comment.create({ content, userId, postId });
    res.status(201).redirect(`/post/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
