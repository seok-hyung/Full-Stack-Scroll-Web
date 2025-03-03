import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../services/api';
import './BoardList.css';

interface Post {
  id: number;
  title: string;
  date: string;
  conference: string;
  location: string;
  category: string;
}

const BoardList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchPosts();
        setPosts(response.data || []);
        setError(null);
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleRowClick = (id: number) => {
    navigate(`/board/presentation/${id}`);
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="board-list-container">
      <h1 className="board-title">발표논문 게시판</h1>

      <div className="board-table-container">
        <table className="board-table">
          <thead>
            <tr>
              <th className="id-column">번호</th>
              <th className="conference-column">학술대회명</th>
              <th className="title-column">논문명</th>
              <th className="date-column">날짜</th>
              <th className="location-column">비고(국내/해외)</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} onClick={() => handleRowClick(post.id)}>
                  <td className="id-column">{post.id}</td>
                  <td className="conference-column">{post.conference || '-'}</td>
                  <td className="title-column">{post.title}</td>
                  <td className="date-column">{post.date}</td>
                  <td className="location-column">{post.location || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-posts">
                  등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="board-bottom-actions">
        <div className="back-button">
          <Link to="/">메인으로 돌아가기</Link>
        </div>
        <div className="write-button">
          <Link to="/board/presentation/write">글쓰기</Link>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
