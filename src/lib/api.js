import axios from "axios";

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const API_URL = RAW_API_URL.replace(/\/+$/, '').replace(/\/api$/, ''); // ex: https://portfolio-backend.onrender.com

export const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const resolveAssetUrl = (url) => {
  if (!url) return url;
  const base = (API_URL || '').replace(/\/+$/, '');
  const replaced = url.replace('http://localhost:3001', base);
  if (/^https?:\/\//i.test(replaced)) return replaced;
  if (replaced.startsWith('/')) return `${base}${replaced}`;
  return `${base}/${replaced}`;
};

// Projects API
export const projectsApi = {
  getAll: () => api.get("/projects"),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Skills API
export const skillsApi = {
  getAll: () => api.get("/api/skills"),
  getById: (id) => api.get(`/api/skills/${id}`),
  getByCategories: () => api.get("/api/skills/by-categories"),
  create: (data) => api.post("/api/skills", data),
  update: (id, data) => api.patch(`/api/skills/${id}`, data),
  delete: (id) => api.delete(`/api/skills/${id}`),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get("/api/dashboard/stats"),
  getTimeline: () => api.get("/api/dashboard/timeline"),
  getRecentActivity: () => api.get("/api/dashboard/recent-activity"),
};

// Upload API
export const uploadApi = {
  uploadSkillIcon: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/upload/skill-icon", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadProjectIcon: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/upload/project-icon", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default api;
