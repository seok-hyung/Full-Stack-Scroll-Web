const boardModel = require('../models/boardModel');

// 게시글 목록 조회
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await boardModel.getPosts();

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// 게시글 상세 조회
exports.getPostById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await boardModel.getPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.',
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// 게시글 생성
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, conference, location, category } = req.body;

    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: '제목과 내용은 필수 입력 항목입니다.',
      });
    }

    const postId = await boardModel.createPost({
      title,
      content,
      conference,
      location,
      category: category || 'presentation',
    });

    res.status(201).json({
      success: true,
      message: '게시글이 성공적으로 등록되었습니다.',
      postId,
    });
  } catch (error) {
    next(error);
  }
};

// 게시글 수정
exports.updatePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, conference, location, category } = req.body;

    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: '제목과 내용은 필수 입력 항목입니다.',
      });
    }

    // 게시글 존재 여부 확인
    const post = await boardModel.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.',
      });
    }

    await boardModel.updatePost(id, {
      title,
      content,
      conference,
      location,
      category: category || 'presentation',
    });

    res.json({
      success: true,
      message: '게시글이 성공적으로 수정되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};

// 게시글 삭제
exports.deletePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // 게시글 존재 여부 확인
    const post = await boardModel.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.',
      });
    }

    // 게시글 삭제
    await boardModel.deletePost(id);

    res.json({
      success: true,
      message: '게시글이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};
