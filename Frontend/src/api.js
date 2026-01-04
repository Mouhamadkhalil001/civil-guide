import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Get all jobs with optional filters
export const getJobs = (params = {}) => {
  return api.get('/jobs', { params }).then(res => res.data);
};

// Get single job by id
export const getJob = (id) => {
  return api.get(`/jobs/${id}`).then(res => res.data);
};

// Create new job
export const createJob = (jobData) => {
  return api.post('/jobs', jobData).then(res => res.data);
};

// Register new user
export const register = (userData) => {
  return api.post('/register', userData).then(res => res.data);
};

// Login user
export const login = (credentials) => {
  return api.post('/login', credentials).then(res => res.data);
};

// Get all users (admin only)
export const getUsers = () => {
  return api.get('/users').then(res => res.data);
};

// Get current user profile
export const getMe = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return api.get('/me', { params: { email: user.email } }).then(res => res.data);
};

// Update profile (name/email)
export const updateProfile = (data) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return api.put('/me', { ...data, email: user.email, newEmail: data.email }).then(res => res.data);
};

// Upload avatar
export const uploadAvatar = (formData) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  formData.append('email', user.email);
  return api.post('/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};

// Change password
export const changePassword = (data) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return api.put('/me/password', { ...data, email: user.email }).then(res => res.data);
};

export default api;
