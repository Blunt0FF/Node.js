import api from './api';

export const fetchPosts = () => api.get('/posts');

export const createPost = (data: { title: string; content: string }) =>
  api.post('/posts', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

export const deletePost = (id: string, token: string | null) =>
  api.delete(`/posts/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    },
    withCredentials: true
  });