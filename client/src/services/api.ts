import axios from 'axios';

// 배포 환경에 따른 API URL 설정
const isDevelopment = process.env.REACT_APP_ENV === 'development';
const API_BASE_URL = isDevelopment ? process.env.REACT_APP_API_URL : '/api';

// 게시글 목록 조회
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/board/presentation`);
    return response.data;
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchPostById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/board/presentation/${id}`);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${id} 조회 실패:`, error);
    throw error;
  }
};

// 게시글 생성
interface PostFormData {
  title: string;
  content: string;
  conference?: string;
  location?: string;
  category?: string;
}

export const createPost = async (postData: PostFormData) => {
  try {
    const response = await axios.post<{ success: boolean; message: string; postId: number }>(
      `${API_BASE_URL}/board/presentation`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (id: number, postData: PostFormData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/board/presentation/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${id} 수정 실패:`, error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/board/presentation/${id}`);
    return response.data;
  } catch (error) {
    console.error(`게시글 ${id} 삭제 실패:`, error);
    throw error;
  }
};
