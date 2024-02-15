const express = require('express');
const router = express.Router();


let posts = [];


router.get('/posts', (req, res) => {
  res.json(posts);
});
router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(post => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

router.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now().toString(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const index = posts.findIndex(post => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  posts[index] = { ...posts[index], title, content };
  res.json(posts[index]);
});

router.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex(post => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  posts.splice(index, 1);
  res.status(204).end();
});

module.exports = router;