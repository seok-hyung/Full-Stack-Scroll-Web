const db = require('../config/db');

// 게시글 목록 조회
exports.getPosts = async () => {
  const [rows] = await db.query(
    `SELECT 
      id, title, DATE_FORMAT(date, '%Y-%m-%d') as date, 
      conference, location, category
     FROM posts
     WHERE category = 'presentation'
     ORDER BY id DESC`
  );
  return rows;
};

// 게시글 상세 조회
exports.getPostById = async (id) => {
  const [rows] = await db.query(
    `SELECT 
      id, title, content, DATE_FORMAT(date, '%Y-%m-%d') as date, 
      conference, location, category
     FROM posts
     WHERE id = ? AND category = 'presentation'`,
    [id]
  );
  return rows[0];
};

// 게시글 생성
exports.createPost = async (postData) => {
  const { title, content, conference, location, category } = postData;

  const [result] = await db.query(
    `INSERT INTO posts (title, content, date, conference, location, category)
     VALUES (?, ?, NOW(), ?, ?, ?)`,
    [title, content, conference, location, category]
  );

  return result.insertId;
};

// 게시글 수정
exports.updatePost = async (id, postData) => {
  const { title, content, conference, location, category } = postData;

  await db.query(
    `UPDATE posts 
     SET title = ?, content = ?, conference = ?, location = ?, category = ?
     WHERE id = ?`,
    [title, content, conference, location, category, id]
  );
};

// 게시글 삭제
exports.deletePost = async (id) => {
  await db.query(`DELETE FROM posts WHERE id = ?`, [id]);
};
