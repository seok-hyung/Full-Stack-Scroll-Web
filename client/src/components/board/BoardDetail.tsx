import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../../services/api';
import './BoardDetail.css';

interface Post {
  id: number;
  title: string;
  date: string;
  content: string;
  conference: string;
  location: string;
  category: string;
}

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchPostById(parseInt(id));
        setPost(data);
        setError(null);
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleDelete = async () => {
    if (!post || !window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deletePost(post.id);
      alert('게시글이 삭제되었습니다.');
      navigate('/board/presentation');
    } catch (err) {
      alert('게시글 삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error || !post) {
    return <div className="error">{error || '게시글을 찾을 수 없습니다.'}</div>;
  }

  return (
    <div className="board-detail-container">
      <div className="board-detail-header">
        <h1 className="board-detail-title">{post.title}</h1>
        <div className="board-detail-info">
          <span className="date">날짜: {post.date}</span>
        </div>
        <div className="board-detail-meta">
          <span className="conference">학술대회명: {post.conference || '없음'}</span>
          <span className="location">비고: {post.location || '없음'}</span>
        </div>
      </div>

      <div className="board-detail-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="board-detail-actions">
        <div className="left-actions">
          <Link to="/board/presentation" className="btn btn-back">
            목록으로
          </Link>
        </div>
        <div className="right-actions">
          <Link to={`/board/presentation/edit/${post.id}`} className="btn btn-edit">
            수정
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
