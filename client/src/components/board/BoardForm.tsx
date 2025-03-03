import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, createPost, updatePost } from '../../services/api';
import './BoardForm.css';

interface PostFormData {
  title: string;
  conference: string;
  location: string;
  category: string;
  content: string;
}

const BoardForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    conference: '',
    location: '국내',
    category: 'presentation',
    content: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      const loadPost = async () => {
        try {
          setLoading(true);
          const post = await fetchPostById(parseInt(id));
          setFormData({
            title: post.title,
            conference: post.conference,
            location: post.location,
            category: post.category,
            content: post.content,
          });
          setError(null);
        } catch (err) {
          setError('게시글을 불러오는 중 오류가 발생했습니다.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadPost();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        await updatePost(parseInt(id), formData);
        alert('게시글이 수정되었습니다.');
      } else {
        await createPost(formData);
        alert('게시글이 등록되었습니다.');
      }

      navigate('/board/presentation');
    } catch (err) {
      setError('게시글 저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="board-form-container">
      <h1 className="form-title">{isEditMode ? '게시글 수정' : '게시글 작성'}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">논문명</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="conference">학술대회명</label>
          <input type="text" id="conference" name="conference" value={formData.conference} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="location">비고(국내/해외)</label>
          <select id="location" name="location" value={formData.location} onChange={handleChange}>
            <option value="국내">국내</option>
            <option value="해외">해외</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/board/presentation')}>
            취소
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? '처리 중...' : isEditMode ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
