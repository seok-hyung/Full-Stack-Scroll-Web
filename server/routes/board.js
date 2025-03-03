const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// 발표논문 게시판 라우트
router.get('/presentation', boardController.getPosts);
router.get('/presentation/:id', boardController.getPostById);
router.post('/presentation', boardController.createPost);
router.put('/presentation/:id', boardController.updatePost);
router.delete('/presentation/:id', boardController.deletePost);

module.exports = router;
