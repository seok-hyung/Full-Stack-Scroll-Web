const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// 환경 변수 로드
dotenv.config();

// // 데이터베이스 연결 정보 로깅 (디버깅용)
// console.log('데이터베이스 연결 시도:', {
//   host: process.env.SERVER_DB_HOST,
//   user: process.env.SERVER_DB_USER,
//   database: process.env.SERVER_DB_NAME,
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
  }
};

// 쿼리 실행 함수
const query = async (sql, params) => {
  return await pool.query(sql, params);
};

module.exports = {
  query,
  testConnection,
};
