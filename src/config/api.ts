// API configuration for different environments
const getApiBaseUrl = () => {
  // In development, use the proxy (localhost:8000)
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production (Vercel), use the same /api path
  // Vercel will automatically route /api/* to our serverless functions
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to create full API URLs
export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};
