import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

export const createPost = async (postData, authCode) => {
  try {
    const response = await api.post('/post', postData, {
      headers: {
        'PinggyAuthHeader': authCode
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create post';
  }
};

export const fetchPosts = async () => {
  try {
    const response = await api.get('/list');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch posts';
  }
};