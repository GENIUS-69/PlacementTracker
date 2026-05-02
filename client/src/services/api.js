import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const RoadmapService = {
  getRoadmap: (name) => api.get(`/roadmaps/${name}`),
  updateStatus: (name, topicId, subtopicId, status) => 
    api.patch(`/roadmaps/${name}/${topicId}/${subtopicId}`, { status }),
};

export const AnalyticsService = {
  getProgress: () => api.get('/analytics/progress'),
  getWeekly: () => api.get('/analytics/weekly'),
};

export const StudyService = {
  logSession: (data) => api.post('/study', data),
  getStats: () => api.get('/study/stats'),
};

export const TestService = {
  createTest: (data) => api.post('/tests', data),
  getTests: () => api.get('/tests'),
  updateTest: (id, data) => api.put(`/tests/${id}`, data),
  deleteTest: (id) => api.delete(`/tests/${id}`),
};

export default api;
