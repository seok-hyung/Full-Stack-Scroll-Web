const mysql = require('mysql2/promise');
require('dotenv').config();

// // 데이터베이스 연결 정보 로깅
// console.log('데이터베이스 연결 정보:', {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'chalix_db',
// });

const pool = mysql.createPool({
  host: process.env.SERVER_DB_HOST,
  user: process.env.SERVER_DB_USER,
  password: process.env.SERVER_DB_PASSWORD,
  database: process.env.SERVER_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 데이터베이스 연결 테스트
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('데이터베이스 연결 성공!');
    connection.release();
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error.message);
    // 프로세스를 종료하지 않고 오류만 기록
    // process.exit(1);
  }
};

testConnection();

module.exports = pool;
