import api from './api';

export const getTransactions = () => api.get('/api/transactions');
export const addTransaction = (data: { email: string; amount: number }) =>
  api.post('/api/set-balance', data);