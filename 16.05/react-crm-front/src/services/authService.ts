import api from './api';

export const login = (credentials: { email: string; password: string }) =>
  api.post('/users/login', credentials);

export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/users/register', data);