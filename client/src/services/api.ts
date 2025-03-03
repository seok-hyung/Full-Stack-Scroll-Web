import axios from 'axios';

// 배포 환경에 따른 API URL 설정
const API_BASE_URL = process.env.REACT_APP_API_URL;

// 게시글 목록 조회
export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/board/presentation`);
  return response.data;
};

// 게시글 상세 조회
export const fetchPostById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/board/presentation/${id}`);
  return response.data;
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
  const response = await axios.post<{ success: boolean; message: string; postId: number }>(
    `${API_BASE_URL}/board/presentation`,
    postData
  );
  return response.data;
};

// 게시글 수정
export const updatePost = async (id: number, postData: PostFormData) => {
  const response = await axios.put(`${API_BASE_URL}/board/presentation/${id}`, postData);
  return response.data;
};

// 게시글 삭제
export const deletePost = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/board/presentation/${id}`);
  return response.data;
};
