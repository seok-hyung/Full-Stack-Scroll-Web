import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BoardListPage from '../pages/BoardListPage';
import BoardDetailPage from '../pages/BoardDetailPage';
import BoardFormPage from '../pages/BoardFormPage';
import HomePage from '../pages/HomePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* 게시판 라우트 */}
      <Route path="/board/presentation/write" element={<BoardFormPage />} />
      <Route path="/board/presentation/edit/:id" element={<BoardFormPage />} />
      <Route path="/board/presentation/:id" element={<BoardDetailPage />} />
      <Route path="/board/presentation" element={<BoardListPage />} />
    </Routes>
  );
};

export default AppRoutes;
