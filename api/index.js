const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const boardRoutes = require('./routes/board');
const db = require('./config/db');

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

// 데이터베이스 연결 테스트
try {
  db.testConnection();
} catch (error) {
  console.error('DB 연결 테스트 실패:', error);
  console.error('오류 세부 정보:', error.stack);
}

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 경로 수정 (Vercel 배포용)
app.use('/api/board', boardRoutes);

// 기본 경로 응답
app.get('/api', (req, res) => {
  res.json({ message: 'API 서버가 정상적으로 작동 중입니다.' });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.',
  });
});

// Vercel 서버리스 환경에서는 app.listen()이 필요 없음
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  });
}

// Vercel 서버리스 함수용 export
module.exports = app;
