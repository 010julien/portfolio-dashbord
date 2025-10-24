import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
}

// Skills API
export const skillsApi = {
  getAll: () => api.get('/skills'),
  getById: (id) => api.get(`/skills/${id}`),
  getByCategories: () => api.get('/skills/by-categories'),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.patch(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
}

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getTimeline: () => api.get('/dashboard/timeline'),
  getRecentActivity: () => api.get('/dashboard/recent-activity'),
}

// Upload API
export const uploadApi = {
  uploadSkillIcon: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/skill-icon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  uploadProjectIcon: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/project-icon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default api
