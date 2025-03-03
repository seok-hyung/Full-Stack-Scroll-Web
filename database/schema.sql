-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS chalix_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chalix_db;

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATETIME NOT NULL,
  conference VARCHAR(50),
  location ENUM('국내', '해외'), 
  category VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;